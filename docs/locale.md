# Biblioteca de Localização

A facilidade de locale inclui suporte à internacionalização para classificação de caracteres e ordenação de strings, formatação e parsing numérico, monetário e de data/hora, e recuperação de mensagens. As configurações de locale controlam o comportamento de I/O de stream, da biblioteca de expressões regulares e de outros componentes da standard library C++.

### Locales e facets

Definido no header `[<locale>](<#/doc/header/locale>)`
---

##### Locales

[ locale](<#/doc/locale/locale>) | conjunto de facets polimórficos que encapsulam diferenças culturais
(class)
[ use_facet](<#/doc/locale/use_facet>) | obtém um facet de um locale
(function template)
[ has_facet](<#/doc/locale/has_facet>) | verifica se um locale implementa um facet específico
(function template)

##### Classes base de categoria de facet

[ ctype_base](<#/doc/locale/ctype_base>) | define categorias de classificação de caracteres
(class)
[ codecvt_base](<#/doc/locale/codecvt_base>) | define erros de conversão de caracteres
(class)
[ messages_base](<#/doc/locale/messages_base>) | define o tipo de catálogo de mensagens
(class)
[ time_base](<#/doc/locale/time_base>) | define constantes de formato de data
(class)
[ money_base](<#/doc/locale/money_base>) | define padrões de formatação monetária
(class)

##### ctype facets

[ ctype](<#/doc/locale/ctype>) | define tabelas de classificação de caracteres
(class template)
[ ctype_byname](<#/doc/locale/ctype_byname>) | representa o [std::ctype](<#/doc/locale/ctype>) fornecido pelo sistema para o locale nomeado
(class template)
[ ctype&lt;char&gt;](<#/doc/locale/ctype_char>) | especialização de [std::ctype](<#/doc/locale/ctype>) para o tipo char
(class template specialization)
[ codecvt](<#/doc/locale/codecvt>) | converte entre codificações de caracteres, incluindo UTF-8, UTF-16, UTF-32
(class template)
[ codecvt_byname](<#/doc/locale/codecvt_byname>) | representa o [std::codecvt](<#/doc/locale/codecvt>) fornecido pelo sistema para o locale nomeado
(class template)

##### numeric facets

[ num_get](<#/doc/locale/num_get>) | analisa valores numéricos de uma sequência de caracteres de entrada
(class template)
[ num_put](<#/doc/locale/num_put>) | formata valores numéricos para saída como sequência de caracteres
(class template)
[ numpunct](<#/doc/locale/numpunct>) | define regras de pontuação numérica
(class template)
[ numpunct_byname](<#/doc/locale/numpunct_byname>) | representa o [std::numpunct](<#/doc/locale/numpunct>) fornecido pelo sistema para o locale nomeado
(class template)

##### collate facets

[ collate](<#/doc/locale/collate>) | define comparação lexicográfica e hashing de strings
(class template)
[ collate_byname](<#/doc/locale/collate_byname>) | representa o [std::collate](<#/doc/locale/collate>) fornecido pelo sistema para o locale nomeado
(class template)

##### time facets

[ time_get](<#/doc/locale/time_get>) | analisa valores de tempo/data de uma sequência de caracteres de entrada em [std::tm](<#/doc/chrono/c/tm>)
(class template)
[ time_get_byname](<#/doc/locale/time_get_byname>) | representa o [std::time_get](<#/doc/locale/time_get>) fornecido pelo sistema para o locale nomeado
(class template)
[ time_put](<#/doc/locale/time_put>) | formata o conteúdo de [std::tm](<#/doc/chrono/c/tm>) para saída como sequência de caracteres
(class template)
[ time_put_byname](<#/doc/locale/time_put_byname>) | representa o [std::time_put](<#/doc/locale/time_put>) fornecido pelo sistema para o locale nomeado
(class template)

##### monetary facets

[ money_get](<#/doc/locale/money_get>) | analisa e constrói um valor monetário a partir de uma sequência de caracteres de entrada
(class template)
[ money_put](<#/doc/locale/money_put>) | formata um valor monetário para saída como uma sequência de caracteres
(class template)
[ moneypunct](<#/doc/locale/moneypunct>) | define parâmetros de formatação monetária usados por [std::money_get](<#/doc/locale/money_get>) e [std::money_put](<#/doc/locale/money_put>)
(class template)
[ moneypunct_byname](<#/doc/locale/moneypunct_byname>) | representa o [std::moneypunct](<#/doc/locale/moneypunct>) fornecido pelo sistema para o locale nomeado
(class template)

##### messages facets

[ messages](<#/doc/locale/messages>) | implementa a recuperação de strings de catálogos de mensagens
(class template)
[ messages_byname](<#/doc/locale/messages_byname>) | representa o [std::messages](<#/doc/locale/messages>) fornecido pelo sistema para o locale nomeado
(class template)

### Classificação e conversão de caracteres

Definido no header `[<locale>](<#/doc/header/locale>)`
---

##### Classificação de caracteres

[ isspace(std::locale)](<#/doc/locale/isspace>) | verifica se um caractere é classificado como espaço em branco por um locale
(function template)
[ isblank(std::locale)](<#/doc/locale/isblank>)(desde C++11) | verifica se um caractere é classificado como um caractere em branco por um locale
(function template)
[ iscntrl(std::locale)](<#/doc/locale/iscntrl>) | verifica se um caractere é classificado como um caractere de controle por um locale
(function template)
[ isupper(std::locale)](<#/doc/locale/isupper>) | verifica se um caractere é classificado como maiúsculo por um locale
(function template)
[ islower(std::locale)](<#/doc/locale/islower>) | verifica se um caractere é classificado como minúsculo por um locale
(function template)
[ isalpha(std::locale)](<#/doc/locale/isalpha>) | verifica se um caractere é classificado como alfabético por um locale
(function template)
[ isdigit(std::locale)](<#/doc/locale/isdigit>) | verifica se um caractere é classificado como um dígito por um locale
(function template)
[ ispunct(std::locale)](<#/doc/locale/ispunct>) | verifica se um caractere é classificado como pontuação por um locale
(function template)
[ isxdigit(std::locale)](<#/doc/locale/isxdigit>) | verifica se um caractere é classificado como um dígito hexadecimal por um locale
(function template)
[ isalnum(std::locale)](<#/doc/locale/isalnum>) | verifica se um caractere é classificado como alfanumérico por um locale
(function template)
[ isprint(std::locale)](<#/doc/locale/isprint>) | verifica se um caractere é classificado como imprimível por um locale
(function template)
[ isgraph(std::locale)](<#/doc/locale/isgraph>) | verifica se um caractere é classificado como gráfico por um locale
(function template)

##### Conversões de caracteres

[ toupper(std::locale)](<#/doc/locale/toupper>) | converte um caractere para maiúscula usando o facet ctype de um locale
(function template)
[ tolower(std::locale)](<#/doc/locale/tolower>) | converte um caractere para minúscula usando o `ctype` facet de um locale
(function template)

##### Conversões de string e stream

[ wstring_convert](<#/doc/locale/wstring_convert>)(desde C++11)(obsoleto em C++17)(removido em C++26) | realiza conversões entre uma wide string e uma byte string
(class template)
[ wbuffer_convert](<#/doc/locale/wbuffer_convert>)(desde C++11)(obsoleto em C++17)(removido em C++26) | realiza conversão entre um buffer de stream de bytes e um buffer de wide stream
(class template)

### Facets de conversão Unicode independentes de locale

| Definido no header `[<codecvt>](<#/doc/header/codecvt>)`
---
[ codecvt_utf8](<#/doc/locale/codecvt_utf8>)(desde C++11)(obsoleto em C++17)(removido em C++26) | converte entre UTF-8 e UCS-2/UCS-4
(class template)
[ codecvt_utf16](<#/doc/locale/codecvt_utf16>)(desde C++11)(obsoleto em C++17)(removido em C++26) | converte entre UTF-16 e UCS-2/UCS-4
(class template)
[ codecvt_utf8_utf16](<#/doc/locale/codecvt_utf8_utf16>)(desde C++11)(obsoleto em C++17)(removido em C++26) | converte entre UTF-8 e UTF-16
(class template)
[ codecvt_mode](<#/doc/locale/codecvt_mode>)(desde C++11)(obsoleto em C++17)(removido em C++26) | tags para alterar o comportamento dos facets codecvt padrão
(enum)
(até C++26)

### Locales da biblioteca C

Definido no header `[<clocale>](<#/doc/header/clocale>)`
---
[ setlocale](<#/doc/locale/setlocale>) | obtém e define o locale C atual
(function)
[ LC_ALLLC_COLLATELC_CTYPELC_MONETARYLC_NUMERICLC_TIME](<#/doc/locale/LC_categories>) | categorias de locale para [std::setlocale](<#/doc/locale/setlocale>)
(macro constant)
[ localeconv](<#/doc/locale/localeconv>) | consulta detalhes de formatação numérica e monetária do locale atual
(function)
[ lconv](<#/doc/locale/lconv>) | detalhes de formatação, retornados por [std::localeconv](<#/doc/locale/localeconv>)
(class)

### Ver também

[Documentação C](<#/>) para suporte à Localização
---