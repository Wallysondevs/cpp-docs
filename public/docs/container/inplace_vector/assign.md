# std::inplace_vector&lt;T,N&gt;::assign

```cpp
constexpr void assign( size_type count, const T& value );  // (1) (desde C++26)
template< class InputIt >
constexpr void assign( InputIt first, InputIt last );  // (2) (desde C++26)
constexpr void assign( std::initializer_list<T> ilist );  // (3) (desde C++26)
```

  
Substitui o conteúdo do container. 

1) Substitui o conteúdo por `count` cópias do valor `value`.

2) Substitui o conteúdo por cópias dos elementos no range `[`first`, `last`)`.

Se qualquer um dos argumentos for um iterator para `*this`, o comportamento é indefinido. Esta sobrecarga participa da resolução de sobrecarga apenas se `InputIt` satisfizer [LegacyInputIterator](<#/doc/named_req/InputIterator>).

3) Substitui o conteúdo pelos elementos de `ilist`.

| Esta seção está incompleta   
  
### Parâmetros

count  |  \-  |  o novo tamanho do container   
---|---|---
value  |  \-  |  o valor para inicializar os elementos do container   
first, last  |  \-  |  o range de onde copiar os elementos   
ilist  |  \-  |  [std::initializer_list](<#/doc/utility/initializer_list>) de onde copiar os valores   
  
### Complexidade

1) Linear em `count`.

2) Linear na distância entre `first` e `last`.

3) Linear em `ilist.size()`.

### Exceções

1) [std::bad_alloc](<#/doc/memory/new/bad_alloc>), se `count > capacity()`.

2) [std::bad_alloc](<#/doc/memory/new/bad_alloc>), se `std::[ranges::distance](<#/doc/iterator/ranges/distance>)(first, last) > capacity()`.

3) [std::bad_alloc](<#/doc/memory/new/bad_alloc>), se `ilist.size() > capacity()`.

1-3) Qualquer exceção lançada pela inicialização de elementos inseridos.

### Exemplo

O código a seguir usa `assign` para adicionar vários caracteres a um [std::inplace_vector](<#/doc/container/inplace_vector>)<char, 5>:

Execute este código
```
    #include <inplace_vector>
    #include <iterator>
    #include <new>
    #include <print>
     
    int main()
    {
        std::inplace_vector<char, 5> chars;
     
        chars.assign(4, 'a'); // overload (1)
        std::println("{}", chars);
     
        const char extra[3]{'a', 'b', 'c'};
        chars.assign(std::cbegin(extra), std::cend(extra)); // overload (2)
        std::println("{}", chars);
     
        chars.assign({'C', '+', '+', '2', '6'}); // overload (3)
        std::println("{}", chars);
     
        try
        {
            chars.assign(8, 'x'); // throws: count > chars.capacity()
        }
        catch(const std::bad_alloc&) { std::println("std::bad_alloc #1"); }
     
        try
        {
            const char bad[8]{'?'}; // ranges::distance(bad) > chars.capacity()
            chars.assign(std::cbegin(bad), std::cend(bad)); // throws
        }
        catch(const std::bad_alloc&) { std::println("std::bad_alloc #2"); }
     
        try
        {
            const auto l = {'1', '2', '3', '4', '5', '6'};
            chars.assign(l); // throws: l.size() > chars.capacity()
        }
        catch(const std::bad_alloc&) { std::println("std::bad_alloc #3"); }
    }
```

Saída: 
```
    ['a', 'a', 'a', 'a']
    ['a', 'b', 'c']
    ['C', '+', '+', '2', '6']
    std::bad_alloc #1
    std::bad_alloc #2
    std::bad_alloc #3
```

### Veja também

[ assign_range](<#/doc/container/inplace_vector/assign_range>) | atribui um range de valores ao container   
(função membro pública)  
[ operator=](<#/>) | atribui valores ao container   
(função membro pública)