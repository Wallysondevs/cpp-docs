# std::locale

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
class locale;
```

Um objeto da classe `std::locale` é um conjunto indexado imutável de facets imutáveis. Cada objeto de stream da biblioteca de entrada/saída C++ é associado a um objeto `std::locale` e usa seus facets para análise e formatação de todos os dados. Além disso, um objeto locale é associado a cada objeto [std::basic_regex](<#/doc/regex/basic_regex>). (desde C++11) Objetos locale também podem ser usados como predicados que realizam ordenação de strings com os containers e algoritmos padrão e podem ser acessados diretamente para obter ou modificar os facets que eles contêm.

Cada locale construído em um programa C++ contém pelo menos os seguintes facets padrão (ou seja, [std::has_facet](<#/doc/locale/has_facet>) retorna true para todos esses tipos de facet), mas um programa pode definir especializações adicionais ou facets completamente novos e adicioná-los a qualquer objeto locale existente.

Facets suportados
---
[std::ctype](<#/doc/locale/ctype>)&lt;char&gt;
[std::ctype](<#/doc/locale/ctype>)<wchar_t> | [std::codecvt](<#/doc/locale/codecvt>)<char, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)>
[std::codecvt](<#/doc/locale/codecvt>)<wchar_t, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)>
[std::num_get](<#/doc/locale/num_get>)&lt;char&gt;
[std::num_get](<#/doc/locale/num_get>)<wchar_t> | [std::numpunct](<#/doc/locale/numpunct>)&lt;char&gt;
[std::numpunct](<#/doc/locale/numpunct>)<wchar_t>
[std::num_put](<#/doc/locale/num_put>)&lt;char&gt;
[std::num_put](<#/doc/locale/num_put>)<wchar_t>
[std::money_get](<#/doc/locale/money_get>)&lt;char&gt;
[std::money_get](<#/doc/locale/money_get>)<wchar_t> | [std::moneypunct](<#/doc/locale/moneypunct>)&lt;char&gt;
[std::moneypunct](<#/doc/locale/moneypunct>)<char, true>
[std::moneypunct](<#/doc/locale/moneypunct>)<wchar_t>
[std::moneypunct](<#/doc/locale/moneypunct>)<wchar_t, true>
[std::money_put](<#/doc/locale/money_put>)&lt;char&gt;
[std::money_put](<#/doc/locale/money_put>)<wchar_t>
[std::time_get](<#/doc/locale/time_get>)&lt;char&gt;
[std::time_get](<#/doc/locale/time_get>)<wchar_t> | [std::collate](<#/doc/locale/collate>)&lt;char&gt;
[std::collate](<#/doc/locale/collate>)<wchar_t>
[std::time_put](<#/doc/locale/time_put>)&lt;char&gt;
[std::time_put](<#/doc/locale/time_put>)<wchar_t> | [std::messages](<#/doc/locale/messages>)&lt;char&gt;
[std::messages](<#/doc/locale/messages>)<wchar_t>
Facets obsoletos
[std::codecvt](<#/doc/locale/codecvt>)<char16_t, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)> (desde C++11)(obsoleto em C++20)
[std::codecvt](<#/doc/locale/codecvt>)<char32_t, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)> (desde C++11)(obsoleto em C++20)
[std::codecvt](<#/doc/locale/codecvt>)<char16_t, char8_t, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)> (desde C++20)(obsoleto)
[std::codecvt](<#/doc/locale/codecvt>)<char32_t, char8_t, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)> (desde C++20)(obsoleto)

Internamente, um objeto locale é implementado como se fosse um ponteiro com contagem de referências para um array (indexado por [std::locale::id](<#/doc/locale/locale/id>)) de ponteiros com contagem de referências para facets: copiar um locale apenas copia um ponteiro e incrementa várias contagens de referência. Para manter as garantias de segurança de thread da biblioteca padrão C++ (operações em objetos diferentes são sempre thread-safe), tanto a contagem de referência do locale quanto a contagem de referência de cada facet são atualizadas de forma thread-safe, similar a [std::shared_ptr](<#/doc/memory/shared_ptr>).

### Tipos de membros

Tipo | Descrição
---|---
[ id](<#/doc/locale/locale/id>) | o tipo de índice do facet: cada classe de facet deve declarar ou herdar um membro estático público deste tipo
(classe)
[ facet](<#/doc/locale/locale/facet>) | a classe base para todas as categorias de facet: cada facet de qualquer categoria é derivado deste tipo
(classe)
category | int
(typedef)

### Constantes de membro

Nome | Explicação
---|---
const category none[static] | um valor zero indicando nenhuma categoria de facet
(constante de membro estática pública)
const category collate[static] | um valor de bitmask indicando a categoria de facet collate
(constante de membro estática pública)
const category ctype[static] | um valor de bitmask indicando a categoria de facet ctype
(constante de membro estática pública)
const category monetary[static] | um valor de bitmask indicando a categoria de facet monetary
(constante de membro estática pública)
const category numeric[static] | um valor de bitmask indicando a categoria de facet numeric
(constante de membro estática pública)
const category time[static] | um valor de bitmask indicando a categoria de facet time
(constante de membro estática pública)
const category messages[static] | um valor de bitmask indicando a categoria de facet messages
(constante de membro estática pública)
const category all[static] | collate | ctype | monetary | numeric | time | messages
(constante de membro estática pública)

As funções membro de `std::locale` que esperam um argumento `category` requerem um dos valores de categoria definidos acima, ou a união de dois ou mais desses valores. As [`LC` constants](<#/doc/locale/LC_categories>) não são aceitas.

### Funções membro

[ (construtor)](<#/doc/locale/locale/locale>) | constrói um novo locale
(função membro pública)
[ (destrutor)](<#/doc/locale/locale/~locale>) | destrói o locale e os facets cuja contagem de referência se torna zero
(função membro pública)
[ operator=](<#/>) | substitui um locale
(função membro pública)
[ combine](<#/doc/locale/locale/combine>) | constrói um locale com facet identificado em tempo de compilação copiado de outro locale
(função membro pública)
[ name](<#/doc/locale/locale/name>) | retorna o nome do locale ou "*" se não nomeado
(função membro pública)
[ encoding](<#/doc/locale/locale/encoding>)(C++26) | retorna o esquema de codificação de caracteres associado ao locale
(função membro pública)
[ operator==operator!=](<#/doc/locale/locale/operator_cmp>)(removido em C++20) | comparação de igualdade entre objetos locale
(função membro pública)
[ operator()](<#/>) | compara lexicograficamente duas strings usando o facet collate deste locale
(função membro pública)
[ global](<#/doc/locale/locale/global>)[static] | altera o locale global
(função membro estática pública)
[ classic](<#/doc/locale/locale/classic>)[static] | obtém uma referência para o locale "C"
(função membro estática pública)

### Exemplo

Demonstra o prólogo típico de um programa sensível a locale (multiplataforma).

Run this code
```cpp
    #include <iostream>
    #include <locale>
     
    int main()
    {
        std::wcout << L"A configuração de locale preferida pelo usuário é "
                   << std::locale("").name().c_str() << L'\n';
        // na inicialização, o locale global é o locale "C"
        std::wcout << 1000.01 << L'\n';
     
        // substitui o locale global C++ e o locale "C" pelo locale preferido pelo usuário
        std::locale::global(std::locale(""));
        // usa o novo locale global para futuras saídas de caracteres largos
        std::wcout.imbue(std::locale());
     
        // exibe o mesmo número novamente
        std::wcout << 1000.01 << L'\n';
    }
```

Saída possível:
```
    User-preferred locale setting is en_US.UTF8
    1000.01
    1,000.01
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 340](<https://cplusplus.github.io/LWG/issue340>) | C++98 | o conjunto de facets padrão que todos os locales precisam conter era incerto | tornado claro
[LWG 347](<https://cplusplus.github.io/LWG/issue347>) | C++98 | parâmetros do tipo `category` podiam aceitar constantes `LC` | não aceitos mais

### Ver também

[ text_encoding](<#/doc/locale/text_encoding>)(C++26) | descreve uma interface para acessar o [registro de Conjuntos de Caracteres IANA](<https://www.iana.org/assignments/character-sets/character-sets.xhtml>)
(classe)
[ use_facet](<#/doc/locale/use_facet>) | obtém um facet de um locale
(modelo de função)
[ has_facet](<#/doc/locale/has_facet>) | verifica se um locale implementa um facet específico
(modelo de função)
[ imbue](<#/doc/io/ios_base/imbue>) | define o locale
(função membro pública de `std::ios_base`)
[ getloc](<#/doc/io/ios_base/getloc>) | retorna o locale atual
(função membro pública de `std::ios_base`)