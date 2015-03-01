/**
 * travel.js - ������� ��� travel.
 */

 
 // ������ � �������.
function quote(text)
{
	return "&laquo;" + text + "&raquo;";
}


// ��������.
function img(url)
{
	with (raa.Content)
	{	
		BR();
		IMG(url, "default");
		BR();
	}
}


// ����� �������� � �������� ���������.
function imgs(dir, ind_from, ind_to, ext)
{
	for (i = ind_from; i <= ind_to; i++)
	{
		if (i < 10)
		{
			num_str = "0" + i;
		}
		else
		{
			num_str = i;
		}
		img(dir + "/" + num_str + "." + ext);
	}
}


// ���� � ������ � ������������.
function a_imgs(name, str, ind_from, ind_to, ext)
{
	a(name);
	p(str, "h2");
	imgs(name, ind_from, ind_to, ext)
}


// ����� ������ � ��������� ������.			
function p(text, c)
{
	if(c == "quote")
	{
		str = quote(text);
	}
	else
	{
		str = text;
	}
	raa.Content.P(str, c);
}


// �����.
function a(name)
{
	raa.Content.A(name);
}


// �������� ��������� ������� ����.
function SubmenuItem(place, doc_anchor)
{
	this.Place = place;
	this.DocAnchor = doc_anchor;
}
SubmenuItem.prototype.toString = function()
{
	return "{" + this.Place + " (" + this.DocAnchor + ")}";
}


// �������� ������ ������� ����.
function MenuItem(date, country, places, doc_link)
{
	this.Date = date;
	this.Country = country;
	this.Places = places;
	this.DocLink = doc_link;
}
MenuItem.prototype.toString = function()
{
	string = "[" + this.Date + ", " + this.Country + " (" + this.DocLink + ") :";
	for (i = 0; i < this.Places.length; i++)
	{
		string += this.Places[i].toString();
		if (i != (this.Places.length - 1))
		{
			string += ", ";
		}
	}
	string += "]";
	return string;
}

// �������� ����������� ������ ����.
function XMenuItem(date, country, place, doc_link)
{
	this.Date = date;
	this.Country = country;
	this.Place = place;
	this.DocLink = doc_link;
	this.Count = 0;
}
XMenuItem.prototype.toString = function()
{
	return "{" + this.Date + ", " + this.Country + ", " + this.Place + ", " + this.DocLink + ", " + this.Count + "}";
}


// ������� ��������� ��������� ����.
cmp_str_f = function(str1, str2)
{
	if (str1 > str2)
	{
		return 1;
	}
	if (str2 > str1)
	{
		return -1;
	}
	return 0;
}
cmp_str_b = function(str1, str2) { return -cmp_str_f(str1, str2); }
cmp_xi_df = function(x1, x2)
{
	res = cmp_str_f(x1.Date.substr(0, 7), x2.Date.substr(0, 7));
	if (res != 0)
	{
		return res;
	}
	return cmp_str_f(x1.Country + x1.Place, x2.Country + x2.Place);
}
cmp_xi_db = function(x1, x2)
{
	res = cmp_str_b(x1.Date.substr(0, 7), x2.Date.substr(0, 7));
	if (res != 0)
	{
		return res;
	}
	return cmp_str_f(x1.Country + x1.Place, x2.Country + x2.Place);
}
cmp_xi_cf = function(x1, x2)
{
	res = cmp_str_f(x1.Country, x2.Country);
	if (res != 0)
	{
		return res;
	}
	return cmp_str_f(x1.Place + x1.Date, x2.Place + x2.Date);
}
cmp_xi_cb = function(x1, x2)
{
	res = cmp_str_b(x1.Country, x2.Country);
	if (res != 0)
	{
		return res;
	}
	return cmp_str_f(x1.Place + x1.Date, x2.Place + x2.Date);
}
cmp_xi_pf = function(x1, x2)
{
	res = cmp_str_f(x1.Place + x1.Country, x2.Place + x2.Country);
	if (res != 0)
	{
		return res;
	}
	return cmp_str_f(x1.Date, x2.Date);
}
cmp_xi_pb = function(x1, x2)
{
	res = cmp_str_b(x1.Place + x1.Country, x2.Place + x2.Country);
	if (res != 0)
	{
		return res;
	}
	return cmp_str_f(x1.Date, x2.Date);
}


// �������� ���� ��� ��������������.
function create_menu()
{
	arr =
		[
			new MenuItem
				(
					"2006-04", "������",
					[
						new SubmenuItem("������", "rimini"),
						new SubmenuItem("�������", "ravenna"),
						new SubmenuItem("�������", "venice"),
						new SubmenuItem("������", "verona"),
						new SubmenuItem("��������", "sirmione"),
						new SubmenuItem("�����", "milan"),
						new SubmenuItem("�����", "parma"),
						new SubmenuItem("���������", "florence"),
						new SubmenuItem("�����", "siena"),
						new SubmenuItem("�������", "orvieto"),
						new SubmenuItem("���", "rome"),
						new SubmenuItem("����", "pisa")
					],
					"italy.06/index.html"
				),
			new MenuItem("2006-04", "���-������", [new SubmenuItem("���-������", "san_marino")], "italy.06/index.html"),
			new MenuItem("2006-04", "�������", [new SubmenuItem("�������", "vatican")], "italy.06/index.html"),
			new MenuItem
				(
					"2006-08", "�������",
					[
						new SubmenuItem("�����", "salou"),
						new SubmenuItem("���� ��������", "port_aventura"),
						new SubmenuItem("���������", "barcelona")
					],
					"spain.06/index.html"
				),
			new MenuItem("2007-06", "������", [new SubmenuItem("�����-���������", "")], "piter.07/index.html"),
			new MenuItem
				(
					"2007-07", "������",
					[
						new SubmenuItem("�������", "kalyazin"),
						new SubmenuItem("�����", "uglich"),
						new SubmenuItem("�������", "rybinsk"),
						new SubmenuItem("������", "tutaev")
					],
					"rybinsk.07/index.html"
				),
			new MenuItem("2007-11", "����������", [new SubmenuItem("�����", "")], "minsk.07/index.html"),
			new MenuItem("2008-07", "������", [new SubmenuItem("�����", "")], "short/kirov.0807/index.html"),
			new MenuItem("2008-10", "������", [new SubmenuItem("������", "")], "kazan.08/index.html"),
			new MenuItem("2008-11", "�����", [new SubmenuItem("�����", "")], "china.08/index.html"),
			new MenuItem("2008-12", "������", [new SubmenuItem("�����", "")], "short/kirov.0812/index.html"),
			new MenuItem("2009-01", "�������", [new SubmenuItem("�������", "")], "tallinn.09/index_tallinn.html"),
			new MenuItem("2009-01", "���������", [new SubmenuItem("���������", "")], "tallinn.09/index_helsinki.html"),
			new MenuItem("2009-08", "������", [new SubmenuItem("�����", "")], "short/nadym.09/index.html"),
			new MenuItem
				(
					"2009-09", "������",
					[
						new SubmenuItem("�������", "warshaw"),
						new SubmenuItem("�������", "poznan")
					],
					"europe.09/poland/index.html"
				),
			new MenuItem
				(
					"2009-09", "��������",
					[
						new SubmenuItem("������", "berlin"),
						new SubmenuItem("������", "munich")
					],
					"europe.09/germany/index.html"
				),
			new MenuItem
				(
					"2009-09", "����������",
					[
						new SubmenuItem("���������", "amsterdam"),
						new SubmenuItem("���������", "rotterdam"),
						new SubmenuItem("������", "delft"),
						new SubmenuItem("�����", "haag")
					],
					"europe.09/netherlands/index.html"
				),
			new MenuItem("2009-09", "���������", [new SubmenuItem("�����", "")], "europe.09/switzerland/index.html"),
			new MenuItem("2009-09", "�����", [new SubmenuItem("�����", "")], "europe.09/czech/index.html"),
			new MenuItem
				(
					"2011-09", "�������",
					[
						new SubmenuItem("��������", "marbella"),
						new SubmenuItem("������ �����", "puerto_banus"),
						new SubmenuItem("������", "malaga"),
						new SubmenuItem("����������", "fuengirola"),
						new SubmenuItem("�����", "mijas")
					],
					"spain.11/index.html"
				),
			new MenuItem
				(
					"2012-09", "�������",
					[
						new SubmenuItem("��������", "marbella"),
						new SubmenuItem("������ �����", "puerto_banus")
					],
					"spain.12/index.html"
				),
			new MenuItem("2012-11", "��������", [new SubmenuItem("������", "")], "munich.12/index.html")
		];

	return arr;
}


// ��������������� ���� � ���������� ���������.
function flat_menu(menu)
{
	arr = [];
	cur = 0;
	
	for (i = 0; i < menu.length; i++)
	{
		mi = menu[i];
		for (j = 0; j < mi.Places.length; j++)
		{
			si = mi.Places[j];
			full_link = mi.DocLink;
			if (si.DocAnchor != "")
			{
				full_link += "#" + si.DocAnchor;
			}
			arr[cur++] = new XMenuItem(mi.Date, mi.Country, si.Place, full_link);
		}
	}
	
	return arr;
}


// ������� ���������� ��������� ��������� �������� ����.
function count_inner_elements(xmenu)
{
	for (i = 0; i < xmenu.length; i++)
	{
		xmenu[i].Count = 5;
	}
}


// ���������� ������ �� ����.
function month(date)
{
	switch (date.substr(5, 2))
	{
		case "01": return "���";
		case "02": return "���";
		case "03": return "���";
		case "04": return "���";
		case "05": return "���";
		case "06": return "���";
		case "07": return "���";
		case "08": return "���";
		case "09": return "���";
		case "10": return "���";
		case "11": return "���";
		case "12": return "���";
		default: alert("error");
	}
}


// ���������� ���� �� ����.
function year(date)
{
	return date.substr(0, 4);
}


// HTML ��� �������� ����.
function xi_html(xi, sort_function)
{
	html = "<a href=\"" + xi.DocLink + "\" target=\"iframe\">";
	if ((sort_function == cmp_xi_df) || (sort_function == cmp_xi_db))
	{
		return html + "<b><nobr>" + month(xi.Date) + "</nobr></b>: " + xi.Country + " - " + xi.Place + "</a>";
	}
	if ((sort_function == cmp_xi_cf) || (sort_function == cmp_xi_cb))
	{
		return html + xi.Place + " (<nobr>" + month(xi.Date) + " " + year(xi.Date) + "</nobr>)</a>";
	}
	//if((sort_function == cmp_xi_pf) || (sort_function == cmp_xi_pb))
	//{
	//	return html + "(<nobr>" + xi.Date + "</nobr>)</a>";
	//}
	return "<li>error: unknown sort_function</li>";
}


// HTML ��� �������� ���� � ������ ���������� �� �����.
function xi_html_p(xi, only_date)
{
	// NB! �����-�� ������ � ���������� �����������.
	loc_html = "<a href=\"" + xi.DocLink + "\" target=\"iframe\">";
	if (!only_date)
	{
		loc_html += "<b>" + xi.Place + "</b> (" + xi.Country + ") ";
	}
	loc_html += "(<nobr>" + xi.Date + "</nobr>)</a>";
	return loc_html;
}


// ����� ����.
function draw_menu(sort_function)
{
	menu = create_menu();
	xmenu = flat_menu(menu);
	xmenu.sort(sort_function);
	count_inner_elements(xmenu);
	
	html = "<ul>";
	
	if ((sort_function == cmp_xi_pf) || (sort_function == cmp_xi_pb))
	{
		html += "<li>";
		root_place = "";
		cur_place = "";
		for (i = 0; i < xmenu.length; i++)
		{
			cur_place = "<b>" + xmenu[i].Place + "</b> (" + xmenu[i].Country + ")";
			if (cur_place != root_place)
			{
				if (i != 0)
				{
					html += "</li><li>";
				}
				html_m = html + cur_place + " " + xi_html_p(xmenu[i], true);
				html += xi_html_p(xmenu[i], false);
				root_place = cur_place;
			}
			else
			{
				html = html_m;
				html += " " + xi_html_p(xmenu[i], true);
			}
		}
		html += "</li>";
	}
	else if ((sort_function == cmp_xi_df) || (sort_function == cmp_xi_db))
	{
		root_year = "";
		cur_year = "";
		for (i = 0; i < xmenu.length; i++)
		{
			cur_year = year(xmenu[i].Date);
			if (root_year != cur_year)
			{
				if (root_year != "")
				{
					html += "</ul><br></li>";
				}
				html += "<li><b>" + cur_year + "</b><br><br><ul>";
			}
			html += "<li>" + xi_html(xmenu[i], sort_function) + "</li>";
			if (root_year != cur_year)
			{
				root_year = cur_year;
			}
		}
		if (root_year != "")
		{
			html += "</ul></li>";
		}
	}
	else
	{
		root_country = "";
		cur_country = "";
		for (i = 0; i < xmenu.length; i++)
		{
			cur_country = xmenu[i].Country;
			if (root_country != cur_country)
			{
				if (root_country != "")
				{
					html += "</ul><br></li>";
				}
				html += "<li><b>" + cur_country + "</b><br><br><ul>";
			}
			html += "<li>" + xi_html(xmenu[i], sort_function) + "</li>";
			if (root_country != cur_country)
			{
				root_country = cur_country;
			}
		}
		if (root_country != "")
		{
			html += "</ul></li>";
		}
	}
	
	html += "</ul>"
	
	document.getElementById("menudiv").innerHTML = html;
}


// ����� ���������� � ������������.
function travel_statistic()
{
	menu = create_menu();
	xmenu = flat_menu(menu);
	
	// ������� ���������� �����.
	xmenu.sort(cmp_xi_cf);
	countries_count = 0;
	previous_country = "";
	for (i = 0; i < xmenu.length; i++)
	{
		if (xmenu[i].Country != previous_country)
		{
			countries_count++;
			previous_country = xmenu[i].Country;
		}
	}

	// ������� ���������� ���� � ���������
	xmenu.sort(cmp_xi_pf);
	places_count = 0;
	visits_count = 0;
	previous_place = "";
	for (i = 0; i < xmenu.length; i++)
	{
		if (xmenu[i].Place != previous_place)
		{
			places_count++;
			previous_place = xmenu[i].Place;
		}

		visits_count++;
	}

	return "������/�����/��������� - "
		   + countries_count + "/" + places_count + "/" + visits_count;
}


// �������� �������.
function test()
{
}