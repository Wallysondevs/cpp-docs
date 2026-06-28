# std::experimental::basic_string_view&lt;CharT,Traits&gt;::basic_string_view

constexpr basic_string_view() noexcept; | (1) | (TS de fundamentos da biblioteca)
---|---|---
constexpr basic_string_view( const basic_string_view& other ) noexcept = default; | (2) | (TS de fundamentos da biblioteca)
template&lt;class Allocator&gt;
basic_string_view( const [std::basic_string](<#/doc/string/basic_string>)<CharT, Traits, Allocator>& str ) noexcept; | (3) | (TS de fundamentos da biblioteca)
---|---|---
constexpr basic_string_view( const CharT* s, size_type count ); | (4) | (TS de fundamentos da biblioteca)
constexpr basic_string_view( const CharT* s ); | (5) | (TS de fundamentos da biblioteca)

1) Construtor padrão. Constrói um `basic_string_view` vazio.

2) Construtor de cópia. Constrói uma view com o mesmo conteúdo de `other`.

3) Constrói uma view dos primeiros `str.size()` caracteres do array de caracteres começando com o elemento apontado por `str.data()`.

4) Constrói uma view dos primeiros `count` caracteres do array de caracteres começando com o elemento apontado por `s`. `s` pode conter caracteres nulos. O comportamento é indefinido se `[`s`, `s + count`)` não for um range válido (mesmo que o construtor possa não acessar nenhum dos elementos deste range).

5) Constrói uma view da string de caracteres terminada em nulo apontada por `s`, não incluindo o caractere nulo terminador. O comprimento da view é determinado como se por `Traits::length(s)`. O comportamento é indefinido se `[`s`, `s + Traits::length(s)`)` não for um range válido (mesmo que o construtor possa não acessar nenhum dos elementos deste range).

### Parâmetros

- **other** — outra view para inicializar a view
- **str** — um objeto string C++ para inicializar a view
- **s** — ponteiro para um array de caracteres ou uma string C para inicializar a view
- **count** — número de caracteres a serem incluídos na view

### Exceções

4,5) Não lança exceções.

### Complexidade

1-4) Constante.

5) Linear no comprimento de `s`.

### Exemplo

Execute este código
```cpp
    #include <experimental/string_view>
    #include <iostream>
    
    int main()
    {
        std::string cppstr = "Foo";
        char array[3] = {'B', 'a', 'r'};
    
        std::experimental::string_view cppstr_v(cppstr);
        std::experimental::string_view array_v(array, sizeof array);
    
        std::experimental::wstring_view wcstr_v = L"xyzzy";
    
        std::cout << cppstr_v << '\n'
                  << array_v << '\n'
                  << wcstr_v.size() << '\n';
    }
```

Saída:
```
    Foo
    Bar
    5
```

### Veja também

[ operator=](<#/>) | atribui uma view
(função membro pública)