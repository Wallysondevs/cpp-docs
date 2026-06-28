# Biblioteca de expressões regulares (desde C++11)

A biblioteca de expressões regulares fornece uma classe que representa [expressões regulares](<https://en.wikipedia.org/wiki/Regular_expression> "enwiki:Regular expression"), que são uma espécie de mini-linguagem usada para realizar correspondência de padrões (pattern matching) dentro de strings. Quase todas as operações com regexes podem ser caracterizadas pela operação em vários dos seguintes objetos:

  * **Sequência alvo**. A sequência de caracteres que é pesquisada por um padrão. Isso pode ser um range especificado por dois iterators, uma string de caracteres terminada em nulo ou uma [std::string](<#/doc/string/basic_string>).

  * **Padrão**. Esta é a própria expressão regular. Ela determina o que constitui uma correspondência. É um objeto do tipo [std::basic_regex](<#/doc/regex/basic_regex>), construído a partir de uma string com [gramática](<#/doc/regex>) especial.

  * **Array de correspondências**. As informações sobre as correspondências podem ser recuperadas como um objeto do tipo [std::match_results](<#/doc/regex/match_results>).

  * **String de substituição**. Esta é uma string que determina como substituir as correspondências.

### Gramáticas de expressões regulares

Padrões e strings de substituição suportam as seguintes gramáticas de expressões regulares:

  * [Gramática de expressão regular ECMAScript modificada](<#/doc/regex/ecmascript>). Esta é a gramática padrão.
  * [Gramática de expressão regular POSIX básica](<https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap09.html#tag_09_03>).
  * [Gramática de expressão regular POSIX estendida](<https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap09.html#tag_09_04>).
  * A gramática de expressão regular usada pelo utilitário [awk](<https://pubs.opengroup.org/onlinepubs/9699919799/utilities/awk.html#tag_20_06_13_04>) no POSIX.
  * A gramática de expressão regular usada pelo utilitário [grep](<https://pubs.opengroup.org/onlinepubs/9699919799/utilities/grep.html>) no POSIX. Esta é efetivamente a mesma que a gramática de expressão regular POSIX básica, com a adição de uma nova linha '\\n' como separador de alternância.
  * A gramática de expressão regular usada pelo utilitário grep, com a opção -E, no POSIX. Esta é efetivamente a mesma que a gramática de expressão regular POSIX estendida, com a adição de uma nova linha '\\n' como separador de alternância, além de '|'.

Algumas variações de gramática (como correspondência sem distinção entre maiúsculas e minúsculas) também estão disponíveis, veja [esta página](<#/doc/regex/basic_regex/constants>) para detalhes.

### Classes principais

Estas classes encapsulam uma expressão regular e os resultados da correspondência de uma expressão regular dentro de uma sequência alvo de caracteres.

[ basic_regex](<#/doc/regex/basic_regex>)(C++11) | objeto de expressão regular
(class template)
[ sub_match](<#/doc/regex/sub_match>)(C++11) | identifica a sequência de caracteres correspondida por uma sub-expressão
(class template)
[ match_results](<#/doc/regex/match_results>)(C++11) | identifica uma correspondência de expressão regular, incluindo todas as correspondências de sub-expressões
(class template)

### Algoritmos

Estas funções são usadas para aplicar a expressão regular encapsulada em uma regex a uma sequência alvo de caracteres.

[ regex_match](<#/doc/regex/regex_match>)(C++11) | tenta corresponder uma expressão regular a uma sequência de caracteres inteira
(function template)
[ regex_search](<#/doc/regex/regex_search>)(C++11) | tenta corresponder uma expressão regular a qualquer parte de uma sequência de caracteres
(function template)
[ regex_replace](<#/doc/regex/regex_replace>)(C++11) | substitui ocorrências de uma expressão regular por texto de substituição formatado
(function template)

### Iterators

Os iterators de regex são usados para percorrer todo o conjunto de correspondências de expressões regulares encontradas dentro de uma sequência.

[ regex_iterator](<#/doc/regex/regex_iterator>)(C++11) | itera por todas as correspondências de regex dentro de uma sequência de caracteres
(class template)
[ regex_token_iterator](<#/doc/regex/regex_token_iterator>)(C++11) | itera pelas sub-expressões especificadas dentro de todas as correspondências de regex em uma dada string ou por substrings não correspondidas
(class template)

### Exceções

Esta classe define o tipo de objetos lançados como exceções para relatar erros da biblioteca de expressões regulares.

[ regex_error](<#/doc/regex/regex_error>)(C++11) | relata erros gerados pela biblioteca de expressões regulares
(class)

### Traits

A classe regex traits é usada para encapsular os aspectos localizáveis de uma regex.

[ regex_traits](<#/doc/regex/regex_traits>)(C++11) | fornece metainformação sobre um tipo de caractere, exigido pela biblioteca regex
(class template)

### Constantes

Definido no namespace `std::regex_constants`
---
[ syntax_option_type](<#/doc/regex/syntax_option_type>)(C++11) | opções gerais que controlam o comportamento da regex
(typedef)
[ match_flag_type](<#/doc/regex/match_flag_type>)(C++11) | opções específicas para correspondência
(typedef)
[ error_type](<#/doc/regex/error_type>)(C++11) | descreve diferentes tipos de erros de correspondência
(typedef)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <regex>
    #include <string>
    
    int main()
    {
        std::string s = "Some people, when confronted with a problem, think "
            "\"I know, I'll use regular expressions.\" "
            "Now they have two problems.";
    
        std::regex self_regex("REGULAR EXPRESSIONS",
            std::regex_constants::ECMAScript | std::regex_constants::icase);
        if (std::regex_search(s, self_regex))
            std::cout << "Text contains the phrase 'regular expressions'\n";
    
        std::regex word_regex("(\\w+)");
        auto words_begin = 
            std::sregex_iterator(s.begin(), s.end(), word_regex);
        auto words_end = std::sregex_iterator();
    
        std::cout << "Found "
                  << std::distance(words_begin, words_end)
                  << " words\n";
    
        const int N = 6;
        std::cout << "Words longer than " << N << " characters:\n";
        for (std::sregex_iterator i = words_begin; i != words_end; ++i)
        {
            std::smatch match = *i;
            std::string match_str = match.str();
            if (match_str.size() > N)
                std::cout << "  " << match_str << '\n';
        }
    
        std::regex long_word_regex("(\\w{7,})");
        std::string new_s = std::regex_replace(s, long_word_regex, "[$&]");
        std::cout << new_s << '\n';
    }
```

Output:
```
    Text contains the phrase 'regular expressions'
    Found 20 words
    Words longer than 6 characters:
      confronted
      problem
      regular
      expressions
      problems
    Some people, when [confronted] with a [problem], think 
    "I know, I'll use [regular] [expressions]." Now they have two [problems].
```