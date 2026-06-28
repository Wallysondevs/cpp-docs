# std::num_put

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
template<
class CharT,
class OutputIt = std::ostreambuf_iterator<CharT>
> class num_put;
```

A classe `std::num_put` encapsula as regras para formatar valores numéricos como strings. Especificamente, os tipos bool, long, unsigned long, long long, unsigned long long (desde C++11), double, long double, void*, e de todos os tipos implicitamente conversíveis a estes (como int ou float) são suportados. Os operadores de saída de formatação padrão (como cout << n;) usam o facet `std::num_put` da locale do stream de I/O para gerar a representação textual de números.

Diagrama de herança

Se uma especialização de `std::num_put` não for garantida de ser fornecida pela standard library (veja abaixo), os comportamentos de seus [put()](<#/doc/locale/num_put/put>) e [do_put()](<#/doc/locale/num_put/put>) não são garantidos conforme especificado.

### Especializações

A standard library é garantida de fornecer as seguintes especializações (elas são [requeridas para serem implementadas por qualquer objeto locale](<#/doc/locale/locale>)):

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`
---
std::num_put&lt;char&gt; | cria representações de string estreitas de números
---|---
std::num_put<wchar_t> | cria representações de string largas de números

Além disso, a standard library também é garantida de fornecer toda especialização que satisfaça os seguintes requisitos de tipo:

*   `CharT` é um de
    *   char,
    *   wchar_t, e
    *   qualquer outro [tipo de container de caracteres](<#/doc/string>) definido pela implementação que atenda aos requisitos para um caractere no qual qualquer um dos [componentes iostream](<#/doc/io>) possa ser instanciado; e
*   `OutputIt` deve atender aos requisitos de [LegacyOutputIterator](<#/doc/named_req/OutputIterator>).

### Tipos aninhados

Tipo | Definição
---|---
`char_type` | `CharT`
`iter_type` | `OutputIt`

### Membros de dados

Membro | Descrição
---|---
[std::locale::id](<#/doc/locale/locale/id>) `id` [static] | o identificador do [facet](<#/doc/locale/locale/facet>)

### Funções membro

[ (construtor)](<#/doc/locale/num_put/num_put>) | constrói um novo facet `num_put`
(função membro pública)
[ put](<#/doc/locale/num_put/put>) | invoca `do_put`
(função membro pública)

### Funções membro protegidas

[ (destrutor)](<#/doc/locale/num_put/~num_put>) | destrói um facet `num_put`
(função membro protegida)
[ do_put](<#/doc/locale/num_put/put>)[virtual] | formata um número e escreve para o stream de saída
(função membro protegida virtual)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <locale>
    #include <string>
    
    int main()
    {
        double n = 1234567.89;
        std::cout.imbue(std::locale("de_DE.UTF-8"));
        std::cout << "Direct conversion to string:\n"
                  << std::to_string(n) << '\n'
                  << "Output using a german locale:\n"
                  << std::fixed << n << '\n'
                  << "Output using an american locale:\n";
    
        // use the facet directly
        std::cout.imbue(std::locale("en_US.UTF-8"));
        auto& f = std::use_facet<std::num_put<char>>(std::cout.getloc());
        f.put(std::ostreambuf_iterator<char>(std::cout), std::cout, ' ', n);
        std::cout << '\n';
    }
```

Saída possível:
```
    Direct conversion to string:
    1234567.890000
    Output using a german locale:
    1.234.567,890000
    Output using an american locale:
    1,234,567.890000
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 427](<https://cplusplus.github.io/LWG/issue427>) | C++98 | `num_put` era garantido de aceitar qualquer `CharT` que
atendesse aos requisitos para um caractere no qual
qualquer um dos componentes iostream pudesse ser instanciado | apenas garante aceitar char,
wchar_t e outros tipos de caracteres
definidos pela implementação
[LWG 2392](<https://cplusplus.github.io/LWG/issue2392>) | C++98 | apenas o tipo de caractere `CharT` poderia ser
garantido de ser aceito por `num_put` | pode garantir aceitar tipos de
container de caracteres definidos pela implementação

### Veja também

[ numpunct](<#/doc/locale/numpunct>) | define regras de pontuação numérica
(class template)
[ num_get](<#/doc/locale/num_get>) | analisa valores numéricos de uma sequência de caracteres de entrada
(class template)
[ to_string](<#/doc/string/basic_string/to_string>)(C++11) | converte um valor integral ou de ponto flutuante para `string`
(função)
[ to_wstring](<#/doc/string/basic_string/to_wstring>)(C++11) | converte um valor integral ou de ponto flutuante para `wstring`
(função)