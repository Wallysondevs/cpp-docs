# std::basic_regex&lt;CharT,Traits&gt;::basic_regex

```cpp
basic_regex();  // (1) (desde C++11)
explicit basic_regex( const CharT* s,
flag_type f = std::regex_constants::ECMAScript );  // (2) (desde C++11)
basic_regex( const CharT* s, std::size_t count,
flag_type f = std::regex_constants::ECMAScript );  // (3) (desde C++11)
basic_regex( const basic_regex& other );  // (4) (desde C++11)
basic_regex( basic_regex&& other ) noexcept;  // (5) (desde C++11)
template< class ST, class SA >
explicit basic_regex( const std::basic_string<CharT,ST,SA>& str,
flag_type f = std::regex_constants::ECMAScript );  // (6) (desde C++11)
template< class ForwardIt >
basic_regex( ForwardIt first, ForwardIt last,
flag_type f = std::regex_constants::ECMAScript );  // (7) (desde C++11)
basic_regex( std::initializer_list<CharT> init,
flag_type f = std::regex_constants::ECMAScript );  // (8) (desde C++11)
```

Constrói uma nova expressão regular a partir de uma sequência de caracteres interpretada de acordo com as flags f.

1) Construtor padrão. Constrói uma expressão regular vazia que não corresponderá a nada.

2) Constrói uma regex a partir de uma string s terminada em nulo.

3) Constrói uma regex a partir de uma sequência de count caracteres, apontados por s.

4) Construtor de cópia. Constrói uma regex copiando other.

5) Construtor de movimento. Constrói uma regex com o conteúdo de other usando move semantics.

6) Constrói uma regex a partir de uma string str.

7) Construtor de range. Constrói a string com o conteúdo do range `[`first`, `last`)`.

8) Construtor de lista de inicialização. Constrói a string com o conteúdo da initializer list init.

### Parâmetros

- **s** — ponteiro para uma string terminada em nulo
- **count** — comprimento de uma sequência de caracteres usada para inicializar a regex
- **first, last** — range de uma sequência de caracteres usada para inicializar a regex
- **str** — uma basic_string usada como fonte para inicializar a regex
- **other** — outra regex para usar como fonte para inicializar a regex
- **init** — initializer list usada para inicializar a regex
- **f** — flags usadas para guiar a interpretação da sequência de caracteres como uma expressão regular
Type requirements
-`ForwardIt` deve atender aos requisitos de [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>).

### Exceções

1) Pode lançar exceções definidas pela implementação.

2,3) [std::regex_error](<#/doc/regex/regex_error>) se a expressão regular fornecida não for válida.

4) Pode lançar exceções definidas pela implementação.

6-8) [std::regex_error](<#/doc/regex/regex_error>) se a expressão regular fornecida não for válida.

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <regex>
    #include <string>
    
    void match_and_print(const std::string& text, const std::regex& pattern)
    {
        std::sregex_iterator it(text.begin(), text.end(), pattern), it_end;
        int count = 0;
        for (; it != it_end; ++it)
        {
            const std::smatch& match = *it;
            std::cout << ++count << ". " << std::quoted(match.str()) << '\n';
        }
        std::cout << (count ? "\n" : "no match found\n\n");
    }
    
    int main()
    {
        const std::string text = "Hello, World! 12345";
    
        // Matches one or more digits
        std::string pattern_text = "\\d+";
        std::cout << "digits (" << pattern_text << "):\n";
        auto pattern = std::regex(pattern_text);
        match_and_print(text, pattern);
    
        // Matches one or more characters split by space
        pattern_text = "[^\\s]+";
        std::cout << "words (" << pattern_text << "):\n";
        pattern = std::regex(pattern_text);
        match_and_print(text, pattern);
    
        // Matches one or more characters split by space
        pattern_text = "[a-zA-Z]+";
        std::cout << "words without symbols and digits (" << pattern_text << "):\n";
        pattern = std::regex(pattern_text);
        match_and_print(text, pattern);
    
        // Matches one non digits, non alphabet
        pattern_text = "[^0-9A-Za-z]";
        std::cout << "symbol (" << pattern_text << "):\n";
        pattern = std::regex(pattern_text);
        match_and_print(text, pattern);
    
        // Matches one or more lowercase
        pattern_text = "[a-z]+";
        std::cout << "lowercase (" << pattern_text << "):\n";
        pattern = std::regex(pattern_text);
        match_and_print(text, pattern);
    
        // Matches one or more lowercase with std::regex::icase flag
        pattern_text = "[a-z]+";
        std::cout << "lowercase with ignore case flag (" << pattern_text << "):\n";
        pattern = std::regex(pattern_text, std::regex::icase);
        match_and_print(text, pattern);
    
        // Matches basic POSIX regular expression
        pattern_text = "[[:digit:]]+";
        std::cout << "basic POSIX regex (" << pattern_text << "):\n";
        pattern = std::regex(pattern_text, std::regex::basic);
        match_and_print(text, pattern);
    
        // Matches extended POSIX regular expression
        pattern_text = "[[:digit:]]+";
        std::cout << "extended POSIX regex (" << pattern_text << "):\n";
        pattern = std::regex(pattern_text, std::regex::extended);
        match_and_print(text, pattern);
    }
```

Saída:
```
    digits (\d+):
    1. "12345"
    
    words ([^\s]+):
    1. "Hello,"
    2. "World!"
    3. "12345"
    
    words without symbols and digits ([a-zA-Z]+):
    1. "Hello"
    2. "World"
    
    symbol ([^0-9A-Za-z]):
    1. ","
    2. " "
    3. "!"
    4. " "
    
    lowercase ([a-z]+):
    1. "ello"
    2. "orld"
    
    lowercase with ignore case flag ([a-z]+):
    1. "Hello"
    2. "World"
    
    basic POSIX regex ([[:digit:]]+):
    no match found
    
    extended POSIX regex ([[:digit:]]+):
    1. "12345"
```