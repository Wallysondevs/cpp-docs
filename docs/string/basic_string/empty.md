# std::basic_string&lt;CharT,Traits,Allocator&gt;::empty

bool empty() const; | | (noexcept desde C++11)
(constexpr desde C++20)

Verifica se a string não possui caracteres, ou seja, se begin() == end().

### Parâmetros

(nenhum)

### Valor de retorno

true se a string estiver vazia, false caso contrário

### Complexidade

Constante.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    
    int main()
    {
        std::string s;
        std::boolalpha(std::cout);
        std::cout << "s.empty():" << s.empty() << "\t s:'" << s << "'\n";
    
        s = "Exemplar";
        std::cout << "s.empty():" << s.empty() << "\t s:'" << s << "'\n";
    
        s = "";
        std::cout << "s.empty():" << s.empty() << "\t s:'" << s << "'\n";
    }
```

Saída:
```
    s.empty():true   s:''
    s.empty():false  s:'Exemplar'
    s.empty():true   s:''
```

### Veja também

[ sizelength](<#/doc/string/basic_string/size>) | retorna o número de caracteres
(função membro pública)
[ max_size](<#/doc/string/basic_string/max_size>) | retorna o número máximo de caracteres
(função membro pública)
[ capacity](<#/doc/string/basic_string/capacity>) | retorna o número de caracteres que podem ser armazenados no armazenamento atualmente alocado
(função membro pública)
[ sizessize](<#/doc/iterator/size>)(C++17)(C++20) | retorna o tamanho de um container ou array
(template de função)
[ empty](<#/doc/iterator/empty>)(C++17) | verifica se o container está vazio
(template de função)
[ empty](<#/doc/string/basic_string_view/empty>) | verifica se a view está vazia
(função membro pública de `std::basic_string_view<CharT,Traits>`)