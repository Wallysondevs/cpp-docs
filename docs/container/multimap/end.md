# std::multimap&lt;Key,T,Compare,Allocator&gt;::end, std::multimap&lt;Key,T,Compare,Allocator&gt;::cend

```cpp
iterator end(); |  (1)  |  (noexcept desde C++11)
const_iterator end() const; |  (2)  |  (noexcept desde C++11)
const_iterator cend() const noexcept;  // (3) (desde C++11)
```

  
Retorna um iterator para o elemento que segue o último elemento do `multimap`.

Este elemento atua como um marcador de posição (placeholder); tentar acessá-lo resulta em comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

Iterator para o elemento que segue o último elemento.

### Complexidade

Constante.

### Observações

libc++ faz o backport de `cend()` para o modo C++98.

### Exemplo

Run this code
```
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

Possible output: 
```
    { 8, LONG }
    { 8, long }
    { 4, int }
    { 2, short }
    { 1, char }
    mmap = { { 1, char } { 2, short } { 4, int } { 4, float } { 8, long } { 8, double } };
```

### Ver também

[ begincbegin](<#/doc/container/multimap/begin>)(desde C++11) |  retorna um iterator para o início   
(função membro pública)  
[ endcend](<#/doc/iterator/end>)(desde C++11)(desde C++14) |  retorna um iterator para o fim de um container ou array   
(modelo de função)