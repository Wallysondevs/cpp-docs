# std::multimap&lt;Key,T,Compare,Allocator&gt;::begin, std::multimap&lt;Key,T,Compare,Allocator&gt;::cbegin

```cpp
iterator begin(); | (1) | (noexcept desde C++11)
const_iterator begin() const; | (2) | (noexcept desde C++11)
const_iterator cbegin() const noexcept;  // (3) (desde C++11)
```

Retorna um iterator para o primeiro elemento do `multimap`.

Se o `multimap` estiver vazio, o iterator retornado será igual a [end()](<#/doc/container/multimap/end>).

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o primeiro elemento.

### Complexidade

Constante.

### Notas

libc++ faz o backport de `cbegin()` para o modo C++98.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <cassert>
    #include <cstddef>
    #include <iostream>
    #include <map>
    #include <string>
    
    int main()
    {
        auto show_node = 
        {
            std::cout << "{ " << node.first << ", " << node.second << " }" << ending;
        };
    
        std::multimap<std::size_t, std::string> mmap;
        assert(mmap.begin() == mmap.end());   // OK
        assert(mmap.cbegin() == mmap.cend()); // OK
    
        mmap.insert({ sizeof(long), "LONG" });
        show_node(*(mmap.cbegin()));
        assert(mmap.begin() != mmap.end());   // OK
        assert(mmap.cbegin() != mmap.cend()); // OK
        mmap.begin()->second = "long";
        show_node(*(mmap.cbegin()));
    
        mmap.insert({ sizeof(int), "int" });
        show_node(*mmap.cbegin());
    
        mmap.insert({ sizeof(short), "short" });
        show_node(*mmap.cbegin());
    
        mmap.insert({ sizeof(char), "char" });
        show_node(*mmap.cbegin());
    
        mmap.insert({{ sizeof(float), "float" }, { sizeof(double), "double"}});
    
        std::cout << "mmap = { ";
        std::for_each(mmap.cbegin(), mmap.cend(), & { show_node(n, ' '); });
        std::cout << "};\n";
    }
```

Saída possível:
```
    { 8, LONG }
    { 8, long }
    { 4, int }
    { 2, short }
    { 1, char }
    mmap = { { 1, char } { 2, short } { 4, int } { 4, float } { 8, long } { 8, double } };
```

### Veja também

[ endcend](<#/doc/container/multimap/end>)(desde C++11) | retorna um iterator para o final
(função membro pública)
[ begincbegin](<#/doc/iterator/begin>)(desde C++11)(desde C++14) | retorna um iterator para o início de um container ou array
(template de função)