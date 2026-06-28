# std::time_get

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template<
class CharT,
class InputIt = std::istreambuf_iterator<CharT>
> class time_get;
```

  
O template de classe `std::time_get` encapsula as regras de parsing de data e hora. O manipulador de E/S [std::get_time](<#/doc/io/manip/get_time>) usa o facet `std::time_get` da locale do stream de E/S para converter entrada de texto em um objeto [std::tm](<#/doc/chrono/c/tm>). 

Diagrama de herança

Se uma especialização de `std::time_get` não for garantida de ser fornecida pela standard library (veja abaixo), os comportamentos de suas funções membro (exceto o construtor e o destrutor) não são garantidos conforme especificado. 

### Especializações

A standard library é garantida de fornecer as seguintes especializações (elas são [obrigatórias para serem implementadas por qualquer objeto locale](<#/doc/locale/locale>)): 

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`  
---  
std::time_get&lt;char&gt; |  faz parsing de representações de string narrow de data e hora   
---|---
std::time_get<wchar_t> |  faz parsing de representações de string wide de data e hora   
  
Além disso, a standard library também é garantida de fornecer toda especialização que satisfaça os seguintes requisitos de tipo: 

  * `CharT` é um de char e wchar_t, e 
  * `InputIt` deve atender aos requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>). 

### Tipos aninhados

Tipo  |  Definição   
---|---
`char_type` |  `CharT`  
`iter_type` |  `InputIt`  
  
### Membros de dados

Membro  |  Descrição   
---|---
[std::locale::id](<#/doc/locale/locale/id>) `id` [static] |  o identificador do [facet](<#/doc/locale/locale/facet>)  
  
### Funções membro

[ (construtor)](<#/doc/locale/time_get/time_get>) |  constrói um novo facet `time_get`   
(função membro pública)  
[ (destrutor)](<#/doc/locale/time_get/~time_get>) |  destrói um facet `time_get`   
(função membro protegida)  
[ date_order](<#/doc/locale/time_get/date_order>) |  invoca `do_date_order`   
(função membro pública)  
[ get_time](<#/doc/locale/time_get/get_time>) |  invoca `do_get_time`   
(função membro pública)  
[ get_date](<#/doc/locale/time_get/get_date>) |  invoca `do_get_date`   
(função membro pública)  
[ get_weekday](<#/doc/locale/time_get/get_weekday>) |  invoca `do_get_weekday`   
(função membro pública)  
[ get_monthname](<#/doc/locale/time_get/get_monthname>) |  invoca `do_get_monthname`   
(função membro pública)  
[ get_year](<#/doc/locale/time_get/get_year>) |  invoca `do_get_year`   
(função membro pública)  
[ get](<#/doc/locale/time_get/get>)(desde C++11) |  invoca `do_get`   
(função membro pública)  
  
### Funções membro protegidas

[ do_date_order](<#/doc/locale/time_get/date_order>)[virtual] |  obtém a ordem preferida de dia, mês e ano   
(função membro protegida virtual)  
[ do_get_time](<#/doc/locale/time_get/get_time>)[virtual] |  extrai horas, minutos e segundos do stream de entrada   
(função membro protegida virtual)  
[ do_get_date](<#/doc/locale/time_get/get_date>)[virtual] |  extrai mês, dia e ano do stream de entrada   
(função membro protegida virtual)  
[ do_get_weekday](<#/doc/locale/time_get/get_weekday>)[virtual] |  extrai o nome de um dia da semana do stream de entrada   
(função membro protegida virtual)  
[ do_get_monthname](<#/doc/locale/time_get/get_monthname>)[virtual] |  extrai um nome de mês do stream de entrada   
(função membro protegida virtual)  
[ do_get_year](<#/doc/locale/time_get/get_year>)[virtual] |  extrai um ano do stream de entrada   
(função membro protegida virtual)  
[ do_get](<#/doc/locale/time_get/get>)[virtual] (desde C++11) |  extrai componentes de data/hora do stream de entrada, de acordo com o formato especificado   
(função membro protegida virtual)  
  
##  Herdado de [std::time_base](<#/doc/locale/time_base>)

###  Tipos aninhados

Tipo  |  Definição   
---|---
`dateorder` |  tipo de enumeração de ordem de data, definindo os valores `no_order`, `dmy`, `mdy`, `ymd` e `ydm`  
  
### Exemplo

Nota: escolha clang para observar a saída. libstdc++ não implementa corretamente o especificador %b: [bug 78714](<https://gcc.gnu.org/bugzilla/show_bug.cgi?id=78714>).

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <locale>
    #include <sstream>
     
    int main()
    {
        std::tm t = {};
        std::istringstream ss("2011-Februar-18 23:12:34");
        ss.imbue(std::locale("de_DE.utf-8"));
     
        ss >> std::get_time(&t, "%Y-%b-%d %H:%M:%S");
        if (ss.fail())
            std::cout << "Parse failed\n";
        else
            std::cout << std::put_time(&t, "%c") << '\n';
    }
```

Saída possível: 
```
    Sun Feb 18 23:12:34 2011
```

### Veja também

[ time_put](<#/doc/locale/time_put>) |  formata o conteúdo de [std::tm](<#/doc/chrono/c/tm>) para saída como sequência de caracteres   
(template de classe)  
[ get_time](<#/doc/io/manip/get_time>)(desde C++11) |  faz parsing de um valor de data/hora de formato especificado   
(template de função)