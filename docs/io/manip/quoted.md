# std::quoted

Definido no cabeçalho `[<iomanip>](<#/doc/header/iomanip>)`

```c
template< class CharT >
/*unspecified*/ quoted( const CharT* s,
CharT delim = CharT('"'), CharT escape = CharT('\\\') );
template< class CharT, class Traits, class Allocator >
/*unspecified*/ quoted( const std::basic_string<CharT, Traits, Allocator>& s,
CharT delim = CharT('"'), CharT escape = CharT('\\\') );
template< class CharT, class Traits>
/*unspecified*/ quoted( std::basic_string_view<CharT, Traits> s,
CharT delim = CharT('"'), CharT escape = CharT('\\\') );
template< class CharT, class Traits, class Allocator >
/*unspecified*/ quoted( std::basic_string<CharT, Traits, Allocator>& s,
CharT delim=CharT('"'), CharT escape=CharT('\\\') );
```

Permite a inserção e extração de strings entre aspas, como as encontradas em [CSV](<https://en.wikipedia.org/wiki/Comma-separated_values> "enwiki:Comma-separated values") ou [XML](<https://en.wikipedia.org/wiki/XML> "enwiki:XML").

1-3) Quando usado em uma expressão `out << quoted(s, delim, escape)`, onde `out` é um output stream com `char_type` igual a `CharT` e, para as sobrecargas (2,3), `traits_type` igual a `Traits`, comporta-se como uma [FormattedOutputFunction](<#/doc/named_req/FormattedOutputFunction>), que insere em `out` uma sequência de caracteres `seq` construída da seguinte forma:

a) Primeiro, o caractere `delim` é adicionado à sequência.

b) Em seguida, cada caractere de `s`, exceto se o próximo caractere a ser exibido for igual a `delim` ou igual a `escape` (conforme determinado por `traits_type::eq` do stream), então primeiro anexa uma cópia extra de `escape`.

c) No final, `delim` é anexado a `seq` mais uma vez.

Então, se `seq.size() < out.width()`, adiciona `out.width()-seq.size()` cópias do caractere de preenchimento `out.fill()` ou no final da sequência (se `ios_base::left` estiver definido em `out.flags()`) ou no início da sequência (em todos os outros casos).

Finalmente, exibe cada caractere da sequência resultante como se chamasse `out.rdbuf()->sputn(seq, n)`, onde `n=[std::max](<#/doc/algorithm/max>)(out.width(), seq.size())` e `out.width(0)` para cancelar os efeitos de [std::setw](<#/doc/io/manip/setw>), se houver.

4) Quando usado em uma expressão `in >> quoted(s, delim, escape)`, onde `in` é um input stream com `char_type` igual a `CharT` e `traits_type` igual a `Traits`, extrai caracteres de `in`, usando [std::basic_istream::operator>>](<#/doc/io/basic_istream/operator_gtgt>), de acordo com as seguintes regras:

a) Se o primeiro caractere extraído não for igual a `delim` (conforme determinado por `traits_type::eq` do stream), então simplesmente executa `in >> s`.

b) Caso contrário (se o primeiro caractere for o delimitador):

1) Desativa a flag `skipws` no input stream.

2) Esvazia a string de destino chamando `s.clear()`.

3) Extrai caracteres de `in` e os anexa a `s`, exceto que sempre que um caractere de escape é extraído, ele é ignorado e o próximo caractere é anexado a `s`. A extração para quando `!in == true` ou quando um caractere `delim` não escapado é encontrado.

4) Descarta o caractere `delim` final (não escapado).

5) Restaura a flag `skipws` no input stream para seu valor original.

### Parâmetros

- **s** — a string a ser inserida ou extraída
- **delim** — o caractere a ser usado como delimitador, o padrão é "
- **escape** — o caractere a ser usado como caractere de escape, o padrão é \

### Valor de retorno

Retorna um objeto de tipo não especificado tal que o comportamento descrito ocorra.

### Exceções

Lança [std::ios_base::failure](<#/doc/io/ios_base/failure>) se `operator>>` ou `operator<<` lançar uma exceção.

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_quoted_string_io`](<#/doc/feature_test>) | [`201304L`](<#/>) | (C++14) | `std::quoted`

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <sstream>
    
    void default_delimiter()
    {
        const std::string in = "std::quoted() quotes this string and embedded \"quotes\" too";
        std::stringstream ss;
        ss << std::quoted(in);
        std::string out;
        ss >> std::quoted(out);
    
        std::cout << "Default delimiter case:\n"
                     "read in     [" << in << "]\n"
                     "stored as   [" << ss.str() << "]\n"
                     "written out [" << out << "]\n\n";
    }
    
    void custom_delimiter()
    {
        const char delim{'$'};
        const char escape{'%'};
    
        const std::string in = "std::quoted() quotes this string and embedded $quotes$ $too";
        std::stringstream ss;
        ss << std::quoted(in, delim, escape);
        std::string out;
        ss >> std::quoted(out, delim, escape);
    
        std::cout << "Custom delimiter case:\n"
                     "read in     [" << in << "]\n"
                     "stored as   [" << ss.str() << "]\n"
                     "written out [" << out << "]\n\n";
    }
    
    int main()
    {
        default_delimiter();
        custom_delimiter();
    }
```

Saída:
```
    Default delimiter case:
    read in     [std::quoted() quotes this string and embedded "quotes" too]
    stored as   ["std::quoted() quotes this string and embedded \"quotes\" too"]
    written out [std::quoted() quotes this string and embedded "quotes" too]
    
    Custom delimiter case:
    read in     [std::quoted() quotes this string and embedded $quotes$ $too]
    stored as   [$std::quoted() quotes this string and embedded %$quotes%$ %$too$]
    written out [std::quoted() quotes this string and embedded $quotes$ $too]
```

### Veja também

[ format](<#/doc/utility/format/format>)(C++20) | armazena a representação formatada dos argumentos em uma nova string
(modelo de função)