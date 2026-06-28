# std::money_get

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template<
class CharT,
class InputIt = std::istreambuf_iterator<CharT>
> class money_get;
```

O template de classe `std::money_get` encapsula as regras para analisar (parsing) valores monetários de streams de caracteres. O manipulador de E/S padrão [std::get_money](<#/doc/io/manip/get_money>) usa o facet `std::money_get` da locale do stream de E/S.

Diagrama de herança

Se uma especialização de `std::money_get` não for garantida pela standard library (veja abaixo), os comportamentos de seus [get()](<#/doc/locale/money_get/get>) e [do_get()](<#/doc/locale/money_get/get>) não são garantidos conforme especificado.

### Especializações

A standard library garante fornecer as seguintes especializações (elas são [obrigatórias para serem implementadas por qualquer objeto locale](<#/doc/locale/locale>)):

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`
---
std::money_get&lt;char&gt; | analisa representações de string estreitas de valores monetários
---|---
std::money_get<wchar_t> | analisa representações de string largas de valores monetários

Além disso, a standard library também garante fornecer toda especialização que satisfaça os seguintes requisitos de tipo:

* `CharT` é um de
    * char,
    * wchar_t, e
    * qualquer outro [tipo de container de caractere](<#/doc/string>) definido pela implementação que atenda aos requisitos para um caractere no qual qualquer um dos [componentes iostream](<#/doc/io>) pode ser instanciado; e
* `InputIt` deve atender aos requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).

### Tipos aninhados

Tipo | Definição
---|---
`char_type` | `CharT`
`string_type` | [std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt;
`iter_type` | `InputIt`

### Membros de dados

Membro | Descrição
---|---
[std::locale::id](<#/doc/locale/locale/id>) `id` [static] | o identificador do [facet](<#/doc/locale/locale/facet>)

### Funções membro

[ (construtor)](<#/doc/locale/money_get/money_get>) | constrói um novo facet `money_get`
(função membro pública)
[ get](<#/doc/locale/money_get/get>) | invoca `do_get`
(função membro pública)

### Funções membro protegidas

[ (destrutor)](<#/doc/locale/money_get/~money_get>) | destrói um facet `money_get`
(função membro protegida)
[ do_get](<#/doc/locale/money_get/get>)[virtual] | analisa um valor monetário de um input stream
(função membro virtual protegida)

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <iterator>
    #include <locale>
    #include <sstream>
    
    int main()
    {
        std::string str = "$1.11 $2.22 $3.33";
        std::cout << std::fixed << std::setprecision(2);
    
        std::cout << '\"' << str << "\" parsed with the I/O manipulator: ";
        std::istringstream s1(str);
        s1.imbue(std::locale("en_US.UTF-8"));
    
        long double val;
        while (s1 >> std::get_money(val))
            std::cout << val / 100 << ' ';
        std::cout << '\n';
    
        str = "USD  1,234.56";
        std::cout << '\"' << str << "\" parsed with the facet directly: ";
        std::istringstream s2(str);
        s2.imbue(std::locale("en_US.UTF-8"));
    
        auto& f = std::use_facet<std::money_get<char>>(s2.getloc());
        std::ios_base::iostate err;
        std::istreambuf_iterator<char> beg(s2), end;
        f.get(beg, end, true, s2, err, val);
    
        std::cout << val / 100 << '\n';
    }
```

Output:
```
    "$1.11 $2.22 $3.33" parsed with the I/O manipulator: 1.11 2.22 3.33
    "USD  1,234.56" parsed with the facet directly: 1234.56
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 427](<https://cplusplus.github.io/LWG/issue427>) | C++98 | `money_get` era garantido aceitar qualquer `CharT` que
atenda aos requisitos para um caractere no qual
qualquer um dos componentes iostream pode ser instanciado | garante aceitar apenas char,
wchar_t e outros tipos de caracteres
definidos pela implementação
[LWG 2392](<https://cplusplus.github.io/LWG/issue2392>) | C++98 | apenas o tipo de caractere `CharT` poderia ser
garantido para ser aceito por `money_get` | pode garantir aceitar tipos de
container de caracteres definidos pela implementação

### Veja também

[ moneypunct](<#/doc/locale/moneypunct>) | define parâmetros de formatação monetária usados por **std::money_get** e [std::money_put](<#/doc/locale/money_put>)
(template de classe)
[ money_put](<#/doc/locale/money_put>) | formata um valor monetário para saída como uma sequência de caracteres
(template de classe)
[ get_money](<#/doc/io/manip/get_money>)(C++11) | analisa um valor monetário
(template de função)