/**
 * Content.js - ������ ��� �������� ���������� �����.
 */

 
// ����������� ������������ ����.
var raa;
if (!raa) raa = {};
raa.Content = {};


// ����� ���������.
raa.Content.Say = function(str)
{
	alert(str);
}


// ������� ������.
raa.Content.Write = function(text)
{
	document.write(text);
}


// ������� ������ ���� �� ����.
raa.Content.ClassStr = function(c)
{
	if (!c)
	{
		return "";
	}
	else
	{
		return " class=\"" + c + "\"";
	}
}


// ����� ����������� ������� ������.
raa.Content.IMG = function(url, c)
{
	with (raa.Content)
	{
		str = "<img src=\"" + url + "\"" + ClassStr(c) + ">";
		Write(str);
	}
}


// �������������� �����������.
raa.Content.HR = function(c)
{
	with (raa.Content)
	{
		str = "<hr " + ClassStr(c) + ">";
		Write(str);
	}
}


// ������� ����������� ������ ��������.
raa.Content.IFRAME = function(url, c)
{
	with (raa.Content)
	{
		str = "<iframe src=\"" + url + "\"" + ClassStr(c) + "></iframe>";
		Write(str);
	}
}


// ����������� �������� ����.
raa.Content.DIV = function(pos, x, y, width, height, text, c)
{
	with (raa.Content)
	{
		style_str = "style=\"position : " + pos
			+ "; top : " + y + "px"
			+ "; left : " + x + "px"
			+ "; height : " + height + "px"
			+ "; width : " + width + "px"
			+ "\"";
		str = "<div " + style_str + ClassStr(c) + ">" + text + "</div>";
		Write(str);
	}
}


// ������� ������.
raa.Content.BR = function()
{
	raa.Content.Write("<br>");
}


// ���������� �������.
raa.Content.P = function(text, c)
{
	with (raa.Content)
	{
		str = "<p" + ClassStr(c) + ">" + text + "</p>";
		Write(str);
	}
}


// �����.
raa.Content.A = function(name)
{
	with (raa.Content)
	{
		str = "<a name=\"" + name + "\"></a>";
		Write(str);
	}
}

// ������ � �������.
raa.Content.Quote = function(text)
{
	return "&laquo;" + text + "&raquo;";
}
