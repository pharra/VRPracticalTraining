from django.shortcuts import render

# Create your views here.
from backend import models
import json
from .shortcut import JsonResponse, render
import hashlib
from VRPracticalTraining.settings import DEBUG

# Paginator
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

# post方法加上前缀post_

DEFAULT_PIC = 'images/avatar/default.jpg'




def post_experimentSearch(request):
    projects = models.Experiment.objects.all()
    projects_count = projects.count()
    paginator = Paginator(projects, 1)

    if projects_count / 9 > int(projects_count / 9) :
        maxPage = int(projects_count / 9) + 1
    else:
        maxPage = int(projects_count / 9)
    page = request.POST.get('page')
    if page:
        project_list = paginator.page(page).object_list
    else:
        project_list = paginator.page(1).object_list
        page = 0

    project_set = []
    for project in project_list:
        project_set.append(project)
    # try:
    #     customer = paginator.page(page)
    # except PageNotAnInteger:
    #     customer = paginator.page(1)
    # except EmptyPage:
    #     customer = paginator.page(paginator.num_pages)

    return JsonResponse({'project': project_set, 'maxPage': maxPage, 'currentPage': page + 1})


def post_login(request):
    # cookie_content = request.COOKIES.get('uhui')
    # if cookie_content:
    #     u_name = cookie_content.split("_")[0]
    # uid = request.uid
    u_name = request.POST.get('username')
    # 通过@判断用户名为email/手机号
    if "@" in u_name:
        # 查询用户是否存在
        user = models.User.objects.filter(email=u_name).count()
        if user == 0:
            return JsonResponse({'error': '用户不存在'})
        pswObj = models.User.objects.get(email=u_name)
        # if pswObj.hasconfirm is False:
        # return JsonResponse({'error': '请到邮箱验证您的账号'})
    else:
        user = models.User.objects.filter(phone=u_name).count()
        if user == 0:
            return JsonResponse({'error': '用户不存在'})
        pswObj = models.User.objects.get(phone=u_name)

    psw = encryption(request.POST.get('password'))
    password = bytes.decode(pswObj.password.encode("UTF-8"))
    if psw == password:
        # 返回cookie，在浏览器关闭前维持登录状态
        response = JsonResponse({'error': ''})

        u_id = bytes.decode(bytes(str(pswObj.userid), "UTF-8"))
        value = u_id + "_" + encryption(u_id + psw)
        response.set_cookie(key="vrpt", value=value, httponly=True)
        return response
    else:
        return JsonResponse({'error': '密码错误'})


def post_logout(request):
    response = HttpResponseRedirect('/')
    response.delete_cookie('vrpt')
    return response


def post_signUp(request):
    username = request.POST.get('username')
    if username == '':
        return JsonResponse({'errno': '1', 'message': '手机号或邮箱不能为空'})
    nickname = request.POST.get('nickname')
    password = encryption(request.POST.get('password'))
    gender = request.POST.get('gender')

    if DEBUG is True:
        print(username + nickname + gender)

    if '@' in username:
        if models.User.objects.filter(email=username).exists():
            return JsonResponse({'errno': '1', 'message': '邮箱已被注册'})
        # 查询数据库中昵称是否存在
        if models.User.objects.filter(nickname=nickname):
            return JsonResponse({'errno': '1', 'message': '昵称已存在'})
        # 将邮箱作为用户名存入数据库中

        # uid = randomID()
        # 邮箱验证
        # sendConfirmMail(username, nickname, uid)

        user = models.User(nickname=nickname, password=password, email=username,
                           usertype='student')

        # 创建列表
        user.save()
        # createLists(user)

        return JsonResponse({'errno': '0', 'message': '注册成功!'})

    else:
        if models.User.objects.filter(phone=username).exists():
            return JsonResponse({'errno': '1', 'message': '手机号已被注册'})
        # 查询数据库中昵称是否存在
        if models.User.objects.filter(nickname=nickname):
            return JsonResponse({'errno': '1', 'message': '昵称已存在'})
        # 短信验证码验证
        pass
        # 将手机号作为用户名存入数据库中
        uid = randomID()
        user = models.User(nickname=nickname, password=password, phone=username,
                           usertype='student')
        user.save()
        # 创建列表

        # createLists(user)
        return JsonResponse({'errno': '0', 'message': '注册成功'})


def encryption(md5):
    key = 'VRPTSever'
    m = hashlib.md5()
    m.update(md5.join(key).encode("UTF-8"))
    return m.hexdigest()
