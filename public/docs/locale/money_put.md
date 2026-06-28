# std::money_put

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template<
class CharT,
class OutputIt = std::ostreambuf_iterator<CharT>
> class money_put;
```

A classe `std::money_put` encapsula as regras para formatar valores monetários como strings. O manipulador de E/S padrão `[std::put_money](<#/doc/io/manip/put_money>)` usa a facet `std::money_put` da locale do stream de E/S.

Diagrama de herança

Se uma especialização de `std::money_put` não for garantida de ser fornecida pela standard library (veja abaixo), os comportamentos de seus `[put()](<#/doc/locale/money_put/put>)` e `[do_put()](<#/doc/locale/money_put/put>)` não são garantidos conforme especificado.

### Especializações

A standard library é garantida de fornecer as seguintes especializações (elas são `[obrigatórias de serem implementadas por qualquer objeto locale](<#/doc/locale/locale>)`):

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`
---
std::money_put&lt;char&gt; | cria representações de string estreitas de valores monetários
---|---
std::money_put<wchar_t> | cria representações de string largas de valores monetários

Além disso, a standard library também é garantida de fornecer toda especialização que satisfaça os seguintes requisitos de tipo:

* `CharT` é um de
  * char,
  * wchar_t, e
  * qualquer outro `[tipo de container de caractere](<#/doc/string>)` definido pela implementação que atenda aos requisitos para um caractere no qual qualquer um dos `[componentes iostream](<#/doc/io>)` possa ser instanciado; e
* `OutputIt` deve atender aos requisitos de `[LegacyOutputIterator](<#/doc/named_req/OutputIterator>)`.

### Tipos aninhados

Tipo | Definição
---|---
`char_type` | `CharT`
`string_type` | `[std::basic_string](<#/doc/string/basic_string>)`&lt;CharT&gt;
`iter_type` | `OutputIt`

### Membros de dados

Membro | Descrição
---|---
`[std::locale::id](<#/doc/locale/locale/id>)` `id` [static] | o identificador da `[facet](<#/doc/locale/locale/facet>)`

### Funções membro

`[ (construtor)](<#/doc/locale/money_put/money_put>)` | constrói uma nova facet `money_put`
(função membro pública)
`[ put](<#/doc/locale/money_put/put>)` | invoca `do_put`
(função membro pública)

### Funções membro protegidas

`[ (destrutor)](<#/doc/locale/money_put/~money_put>)` | destrói uma facet `money_put`
(função membro protegida)
`[ do_put](<#/doc/locale/money_put/put>)`[virtual] | formata um valor monetário e escreve para o stream de saída
(função membro virtual protegida)

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <iterator>
    #include <locale>
    
    int main()
    {
        // using the I/O manipulator
        std::cout.imbue(std::locale("en_US.UTF-8"));
        std::cout << "American locale: "
                  << std::showbase << std::put_money(12345678.9) << '\n';
    
        // using the facet directly
        std::cout.imbue(std::locale("de_DE.UTF-8"));
        std::cout << "German locale: ";
        auto& f = std::use_facet<std::money_put<char>>(std::cout.getloc());
        f.put({std::cout}, false, std::cout, std::cout.fill(), 12345678.9);
        std::cout << '\n';
    }
```

Saída:
```
    American locale: $123,456.79
    German locale: 123.456,79 €
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
`[LWG 427](<https://cplusplus.github.io/LWG/issue427>)` | C++98 | `money_put` era garantido de aceitar qualquer `CharT` que
atendesse aos requisitos para um caractere no qual
qualquer um dos componentes iostream pudesse ser instanciado | apenas garante aceitar char,
wchar_t e outros tipos de caractere
definidos pela implementação
`[LWG 2392](<https://cplusplus.github.io/LWG/issue2392>)` | C++98 | apenas o tipo de caractere `CharT` poderia ser
garantido de ser aceito por `money_put` | pode garantir aceitar tipos de container de caractere
definidos pela implementação

### Veja também

`[ moneypunct](<#/doc/locale/moneypunct>)` | define parâmetros de formatação monetária usados por `[std::money_get](<#/doc/locale/money_get>)` e **std::money_put**
(modelo de classe)
`[ money_get](<#/doc/locale/money_get>)` | analisa e constrói um valor monetário a partir de uma sequência de caracteres de entrada
(modelo de classe)
`[ put_money](<#/doc/io/manip/put_money>)`(desde C++11) | formata e exibe um valor monetário
(modelo de função)