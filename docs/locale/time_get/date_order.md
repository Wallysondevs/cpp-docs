# std::time_get&lt;CharT,InputIt&gt;::date_order, std::time_get&lt;CharT,InputIt&gt;::do_date_order

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
dateorder date_order() const;
protected:
virtual dateorder do_date_order() const;
```

  
1) Função membro pública, chama a função membro virtual protegida `do_date_order` da classe mais derivada.

2) Retorna um valor do tipo [std::time_base::dateorder](<#/doc/locale/time_base>), que descreve o formato de data padrão usado por este locale (esperado por [get_date()](<#/doc/locale/time_get/get_date>) e produzido por [std::strftime()](<#/doc/chrono/c/strftime>) com o especificador de formato '%x').

Os valores válidos (herdados de [std::time_base](<#/doc/locale/time_base>)) são: 

`no_order` |  o formato contém itens variáveis (dia da semana, dia Juliano, etc), ou esta função não está implementada   
---|---
`dmy` |  dia, mês, ano (locales europeus)   
`mdy` |  mês, dia, ano (locales americanos)   
`ymd` |  ano, mês, dia (locales asiáticos)   
`ydm` |  ano, dia, mês (raro)   
  
### Parâmetros

(nenhum) 

### Valor de retorno

Um valor do tipo `dateorder`. 

### Observações

Esta função é opcional, ela pode retornar `no_order` em todos os casos. 

### Exemplo

A saída abaixo foi obtida usando clang (libc++).

Execute este código
```
    #include <iostream>
    #include <locale>
     
    void show_date_order()
    {
        std::time_base::dateorder d = std::use_facet<std::time_get<char>>(
                                          std::locale()
                                      ).date_order();
        switch (d)
        {
            case std::time_base::no_order:
                std::cout << "no_order\n";
                break;
            case std::time_base::dmy:
                std::cout << "day, month, year\n";
                break;
            case std::time_base::mdy:
                std::cout << "month, day, year\n";
                break;
            case std::time_base::ymd:
                std::cout << "year, month, day\n";
                break;
            case std::time_base::ydm:
                std::cout << "year, day, month\n";
                break;
        }
    }
     
    int main()
    {
        std::locale::global(std::locale("en_US.utf8"));
        std::cout << "In U.S. locale, the default date order is: ";
        show_date_order();
     
        std::locale::global(std::locale("ja_JP.utf8"));
        std::cout << "In Japanese locale, the default date order is: ";
        show_date_order();
     
        std::locale::global(std::locale("de_DE.utf8"));
        std::cout << "In German locale, the default date order is: ";
        show_date_order();
    }
```

Saída possível: 
```
    In U.S. locale, the default date order is: month, day, year
    In Japanese locale, the default date order is: year, month, day
    In German locale, the default date order is: day, month, year
```

### Veja também

[ do_get_date](<#/doc/locale/time_get/get_date>)[virtual] |  extrai mês, dia e ano do fluxo de entrada   
(função membro virtual protegida)  
[ time_base](<#/doc/locale/time_base>) |  define constantes de formato de data   
(classe)