# std::basic_string_view&lt;CharT,Traits&gt;::find_first_of

```cpp
constexpr size_type
find_first_of( basic_string_view v, size_type pos = 0 ) const noexcept;  // (1) (desde C++17)
constexpr size_type
find_first_of( CharT ch, size_type pos = 0 ) const noexcept;  // (2) (desde C++17)
constexpr size_type
find_first_of( const CharT* s, size_type pos, size_type count ) const;  // (3) (desde C++17)
constexpr size_type
find_first_of( const CharT* s, size_type pos = 0 ) const;  // (4) (desde C++17)
```

  
Encontra o primeiro caractere igual a qualquer um dos caracteres na sequência de caracteres fornecida. 

1) Encontra a primeira ocorrência de qualquer um dos caracteres de `v` nesta view, começando na posição `pos`.

2) Equivalente a `find_first_of(basic_string_view([std::addressof](<#/doc/memory/addressof>)(ch), 1), pos)`.

3) Equivalente a `find_first_of(basic_string_view(s, count), pos)`.

4) Equivalente a `find_first_of(basic_string_view(s), pos)`.

### Parâmetros

v  |  \-  |  view para procurar   
---|---|---
pos  |  \-  |  posição onde iniciar a busca   
count  |  \-  |  comprimento da string de caracteres a procurar   
s  |  \-  |  ponteiro para uma string de caracteres a procurar   
ch  |  \-  |  caractere a procurar   
  
### Valor de retorno

Posição da primeira ocorrência de qualquer caractere da substring, ou `[npos](<#/doc/string/basic_string_view/npos>)` se nenhum caractere for encontrado. 

### Complexidade

`O([size()](<#/doc/string/basic_string_view/size>) * v.[size()](<#/doc/string/basic_string_view/size>))` no pior caso. 

### Exemplo

Execute este código
```cpp
    #include <string_view>
    
    using namespace std::literals;
    constexpr auto N = std::string_view::npos;
    
    constexpr bool is_white_space(const char c)
    {
        return " \t\n\f\r\v"sv.find_first_of(c) != N;
    };
    
    static_assert(
        1 == "alignas"sv.find_first_of("klmn"sv) &&
          //   └─────────────────────────┘
        N == "alignof"sv.find_first_of("wxyz"sv) &&
          //
        3 == "concept"sv.find_first_of("bcde"sv, /* pos= */ 1) &&
          //     └───────────────────────┘
        N == "consteval"sv.find_first_of("oxyz"sv, /* pos= */ 2) &&
          //
        6 == "constexpr"sv.find_first_of('x') &&
          //        └─────────────────────┘
        N == "constinit"sv.find_first_of('x') &&
          //
        6 == "const_cast"sv.find_first_of('c', /* pos= */ 4) &&
          //        └──────────────────────┘
        N == "continue"sv.find_first_of('c', /* pos= */ 42) &&
          //
        5 == "co_await"sv.find_first_of("cba", /* pos= */ 4) &&
          //       └───────────────────────┘
        7 == "decltype"sv.find_first_of("def", /* pos= */ 2, /* count= */ 2) &&
          //         └────────────────────┘
        N == "decltype"sv.find_first_of("def", /* pos= */ 2, /* count= */ 1) &&
          //
        is_white_space(' ') && is_white_space('\r') && !is_white_space('\a')
    );
    
    int main() {}
```

### Veja também

[ find](<#/doc/string/basic_string_view/find>) | encontra caracteres na view   
(função membro pública)  
[ rfind](<#/doc/string/basic_string_view/rfind>) | encontra a última ocorrência de uma substring   
(função membro pública)  
[ find_last_of](<#/doc/string/basic_string_view/find_last_of>) | encontra a última ocorrência de caracteres   
(função membro pública)  
[ find_first_not_of](<#/doc/string/basic_string_view/find_first_not_of>) | encontra a primeira ausência de caracteres   
(função membro pública)  
[ find_last_not_of](<#/doc/string/basic_string_view/find_last_not_of>) | encontra a última ausência de caracteres   
(função membro pública)  
[ find_first_of](<#/doc/string/basic_string/find_first_of>) | encontra a primeira ocorrência de caracteres   
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)