# std::basic_string_view&lt;CharT,Traits&gt;::find_last_of

```cpp
constexpr size_type
find_last_of( basic_string_view v, size_type pos = npos ) const noexcept;  // (1) (desde C++17)
constexpr size_type
find_last_of( CharT ch, size_type pos = npos ) const noexcept;  // (2) (desde C++17)
constexpr size_type
find_last_of( const CharT* s, size_type pos, size_type count ) const;  // (3) (desde C++17)
constexpr size_type
find_last_of( const CharT* s, size_type pos = npos ) const;  // (4) (desde C++17)
```

  
Encontra o último caractere igual a um dos caracteres na sequência de caracteres fornecida. O algoritmo de busca exato não é especificado. A busca considera apenas o intervalo `[`​0​`, `pos`]`. Se o caractere não estiver presente no intervalo, [npos](<#/doc/string/basic_string_view/npos>) será retornado. 

1) Encontra a última ocorrência de qualquer um dos caracteres de v nesta view, terminando na posição pos.

2) Equivalente a find_last_of(basic_string_view([std::addressof](<#/doc/memory/addressof>)(ch), 1), pos).

3) Equivalente a find_last_of(basic_string_view(s, count), pos).

4) Equivalente a find_last_of(basic_string_view(s), pos).

### Parâmetros

v  |  \-  |  view a ser buscada   
---|---|---
pos  |  \-  |  posição na qual a busca deve terminar   
count  |  \-  |  comprimento da string de caracteres a ser buscada   
s  |  \-  |  ponteiro para uma string de caracteres a ser buscada   
ch  |  \-  |  caractere a ser buscado   
  
### Valor de retorno

Posição da última ocorrência de qualquer caractere da substring, ou [npos](<#/doc/string/basic_string_view/npos>) se nenhum caractere for encontrado. 

### Complexidade

O([size()](<#/doc/string/basic_string_view/size>) * v.[size()](<#/doc/string/basic_string_view/size>)) no pior caso. 

### Exemplo

Execute este código
```cpp
    #include <string_view>
    
    using namespace std::literals;
    constexpr auto N = std::string_view::npos;
    
    static_assert(
        5 == "delete"sv.find_last_of("cdef"sv) &&
          //       └────────────────────┘
        N == "double"sv.find_last_of("fghi"sv) &&
          //
        0 == "else"sv.find_last_of("bcde"sv, 2 /* pos [0..2]: "els" */) &&
          //  └────────────────────────┘
        N == "explicit"sv.find_last_of("abcd"sv, 4 /* pos [0..4]: "expli" */) &&
          //
        3 == "extern"sv.find_last_of('e') &&
          //     └────────────────────┘
        N == "false"sv.find_last_of('x') &&
          //
        0 == "inline"sv.find_last_of('i', 2 /* pos [0..2]: "inl" */) &&
          //  └───────────────────────┘
        N == "mutable"sv.find_last_of('a', 2 /* pos [0..2]: "mut" */) &&
          //
        3 == "namespace"sv.find_last_of("cdef", 3 /* pos [0..3]: "name" */, 3 /* "cde" */) &&
          //     └─────────────────────────┘
        N == "namespace"sv.find_last_of("cdef", 3 /* pos [0..3]: "name" */, 2 /* "cd" */)
    );
    
    int main() {}
```

### Veja também

[ find](<#/doc/string/basic_string_view/find>) |  encontra caracteres na view   
(função membro pública)  
[ rfind](<#/doc/string/basic_string_view/rfind>) |  encontra a última ocorrência de uma substring   
(função membro pública)  
[ find_first_of](<#/doc/string/basic_string_view/find_first_of>) |  encontra a primeira ocorrência de caracteres   
(função membro pública)  
[ find_first_not_of](<#/doc/string/basic_string_view/find_first_not_of>) |  encontra a primeira ausência de caracteres   
(função membro pública)  
[ find_last_not_of](<#/doc/string/basic_string_view/find_last_not_of>) |  encontra a última ausência de caracteres   
(função membro pública)  
[ find_last_of](<#/doc/string/basic_string/find_last_of>) |  encontra a última ocorrência de caracteres   
(função membro pública de `std::basic_string<CharT,Traits,Allocator>`)