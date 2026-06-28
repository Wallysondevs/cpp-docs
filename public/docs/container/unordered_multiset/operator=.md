# std::unordered_multiset&lt;Key,Hash,KeyEqual,Allocator&gt;::operator=

```cpp
unordered_multiset& operator=( const unordered_multiset& other );  // (1) (desde C++11)
  // (2)
unordered_multiset& operator=( unordered_multiset&& other );  // (desde C++11)
(ate C++17)
unordered_multiset& operator=( unordered_multiset&& other ) noexcept(/* see below */);  // (desde C++17)
unordered_multiset& operator=( std::initializer_list<value_type> ilist );  // (3) (desde C++11)
```

  
Substitui o conteúdo do container.

1) Operador de atribuição por cópia. Substitui o conteúdo por uma cópia do conteúdo de other.

Se [std::allocator_traits](<#/doc/memory/allocator_traits>)<allocator_type>::propagate_on_container_copy_assignment::value for true, o allocator de *this é substituído por uma cópia de other. Se o allocator de *this após a atribuição for diferente do seu valor antigo, o allocator antigo é usado para desalocar a memória, então o novo allocator é usado para alocá-la antes de copiar os elementos. Caso contrário, a memória pertencente a *this pode ser reutilizada quando possível. Em qualquer caso, os elementos originalmente pertencentes a *this podem ser destruídos ou substituídos por atribuição por cópia elemento a elemento.

2) Operador de atribuição por movimento. Substitui o conteúdo pelos de other usando move semantics (ou seja, os dados em other são movidos de other para este container). other fica em um estado válido, mas não especificado, depois disso.

Se [std::allocator_traits](<#/doc/memory/allocator_traits>)<allocator_type>::propagate_on_container_move_assignment::value for true, o allocator de *this é substituído por uma cópia do de other. Se for false e os allocators de *this e other não forem iguais, *this não pode assumir a propriedade da memória pertencente a other e deve atribuir por movimento cada elemento individualmente, alocando memória adicional usando seu próprio allocator conforme necessário. Em qualquer caso, todos os elementos originalmente pertencentes a *this são destruídos ou substituídos por atribuição por movimento elemento a elemento.

3) Substitui o conteúdo pelos identificados pela initializer list ilist.

### Parâmetros

other  |  \-  |  outro container para usar como fonte de dados   
---|---|---
ilist  |  \-  |  initializer list para usar como fonte de dados   
  
### Valor de retorno

*this

### Complexidade

1) Linear no tamanho de *this e other.

2) Linear no tamanho de *this, a menos que os allocators não sejam iguais e não se propaguem, caso em que é linear no tamanho de *this e other.

3) Linear no tamanho de *this e ilist.

### Exceções

```cpp
1-3) Pode lançar exceções definidas pela implementação.  | (ate C++17)
1,3) Pode lançar exceções definidas pela implementação. 2) Especificação `noexcept`: noexcept(std::allocator_traits<Allocator>::is_always_equal::value
&& std::is_nothrow_move_assignable<Hash>::value
&& std::is_nothrow_move_assignable<Pred>::value)  // (desde C++17)
```
  
### Notas

Após a atribuição por movimento do container (sobrecarga (2)), a menos que a atribuição por movimento elemento a elemento seja forçada por allocators incompatíveis, referências, ponteiros e iterators (exceto o iterator de fim) para `other` permanecem válidos, mas referem-se a elementos que agora estão em *this. O padrão atual faz essa garantia através da declaração geral em [[container.reqmts]/67](<https://eel.is/c++draft/container.reqmts#67>), e uma garantia mais direta está em consideração via [LWG issue 2321](<https://cplusplus.github.io/LWG/issue2321>). 

### Exemplo

O código a seguir usa operator= para atribuir um [std::unordered_multiset](<#/doc/container/unordered_multiset>) a outro:

Execute este código
```cpp 
    #include <initializer_list>
    #include <iostream>
    #include <iterator>
    #include <unordered_set>
     
    void print(auto const comment, auto const& container)
    {
        auto size = std::size(container);
        std::cout << comment << "{ ";
        for (auto const& element : container)
            std::cout << element << (--size ? ", " : " ");
        std::cout << "}\n";
    }
     
    int main()
    {
        std::unordered_multiset<int> x{1, 2, 3}, y, z;
        const auto w = {4, 5, 6, 7};
     
        std::cout << "Initially:\n";
        print("x = ", x);
        print("y = ", y);
        print("z = ", z);
     
        std::cout << "Copy assignment copies data from x to y:\n";
        y = x;
        print("x = ", x);
        print("y = ", y);
     
        std::cout << "Move assignment moves data from x to z, modifying both x and z:\n";
        z = std::move(x);
        print("x = ", x);
        print("z = ", z);
     
        std::cout << "Assignment of initializer_list w to z:\n";
        z = w;
        print("w = ", w);
        print("z = ", z);
    }
```

Possible output: 
```
    Initially:
    x = { 3, 2, 1 }
    y = { }
    z = { }
    Copy assignment copies data from x to y:
    x = { 3, 2, 1 }
    y = { 3, 2, 1 }
    Move assignment moves data from x to z, modifying both x and z:
    x = { }
    z = { 3, 2, 1 }
    Assignment of initializer_list w to z:
    w = { 4, 5, 6, 7 }
    z = { 7, 6, 5, 4 }
```

### Veja também

[ (constructor)](<#/doc/container/unordered_multiset/unordered_multiset>) |  constrói o `unordered_multiset`   
(função membro pública)  