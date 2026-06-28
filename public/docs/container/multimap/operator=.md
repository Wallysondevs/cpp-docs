# std::multimap&lt;Key,T,Compare,Allocator&gt;::operator=

```cpp
multimap& operator=( const multimap& other );  // (1)
  // (2)
multimap& operator=( multimap&& other );  // (desde C++11)
(ate C++17)
multimap& operator=( multimap&& other ) noexcept(/* see below */);  // (desde C++17)
multimap& operator=( std::initializer_list<value_type> ilist );  // (3) (desde C++11)
```

  
Substitui o conteúdo do container. 

1) Operador de atribuição por cópia. Substitui o conteúdo por uma cópia do conteúdo de other. Se [std::allocator_traits](<#/doc/memory/allocator_traits>)<allocator_type>::propagate_on_container_copy_assignment::value for true, o alocador de *this é substituído por uma cópia de other. Se o alocador de *this após a atribuição for diferente do seu valor antigo, o alocador antigo é usado para desalocar a memória, então o novo alocador é usado para alocá-la antes de copiar os elementos. Caso contrário, a memória pertencente a *this pode ser reutilizada quando possível. Em qualquer caso, os elementos originalmente pertencentes a *this podem ser destruídos ou substituídos por atribuição por cópia elemento a elemento. | (desde C++11)  
  
2) Operador de atribuição por movimento. Substitui o conteúdo pelo de other usando move semantics (ou seja, os dados em other são movidos de other para este container). other fica em um estado válido, mas não especificado, depois.

Se [std::allocator_traits](<#/doc/memory/allocator_traits>)<allocator_type>::propagate_on_container_move_assignment::value for true, o alocador de *this é substituído por uma cópia do de other. Se for false e os alocadores de *this e other não forem iguais, *this não pode assumir a propriedade da memória pertencente a other e deve atribuir por movimento cada elemento individualmente, alocando memória adicional usando seu próprio alocador conforme necessário. Em qualquer caso, todos os elementos originalmente pertencentes a *this são destruídos ou substituídos por atribuição por movimento elemento a elemento.

3) Substitui o conteúdo pelos identificados pela initializer list ilist.

### Parâmetros

other  |  \-  |  outro container para usar como fonte de dados   
---|---|---
ilist  |  \-  |  initializer list para usar como fonte de dados   
  
### Valor de retorno

*this

### Complexidade

1) Linear no tamanho de *this e other.

2) Linear no tamanho de *this, a menos que os alocadores não sejam iguais e não se propaguem, caso em que é linear no tamanho de *this e other.

3) O(NlogN) em geral, onde N é size() + ilist.size(). Linear se ilist for ordenada em relação a [value_comp()](<#/doc/container/multimap/value_comp>).

### Exceções

```cpp
1-3) Pode lançar exceções definidas pela implementação. | (ate C++17)
1,3) Pode lançar exceções definidas pela implementação. 2) Especificação `noexcept`: noexcept(std::allocator_traits<Allocator>::is_always_equal::value
&& std::is_nothrow_move_assignable<Compare>::value)  // (desde C++17)
```
  
### Notas

Após a atribuição por movimento de container (sobrecarga (2)), a menos que a atribuição por movimento elemento a elemento seja forçada por alocadores incompatíveis, referências, ponteiros e iterators (exceto o iterator de fim) para `other` permanecem válidos, mas referem-se a elementos que agora estão em *this. O padrão atual faz essa garantia através da declaração geral em [[container.reqmts]/67](<https://eel.is/c++draft/container.reqmts#67>), e uma garantia mais direta está em consideração via [LWG issue 2321](<https://cplusplus.github.io/LWG/issue2321>). 

### Exemplo

O código a seguir usa operator= para atribuir um [std::multimap](<#/doc/container/multimap>) a outro:

Execute este código
```
    #include <initializer_list>
    #include <iostream>
    #include <iterator>
    #include <map>
    #include <utility>
     
    void print(auto const comment, auto const& container)
    {
        auto size = std::size(container);
        std::cout << comment << "{ ";
        for (auto const& [key, value] : container)
            std::cout << '{' << key << ',' << value << (--size ? "}, " : "} ");
        std::cout << "}\n";
    }
     
    int main()
    {
        std::multimap<int, int> x{{1,1}, {2,2}, {3,3}}, y, z;
        const auto w = {std::pair<const int, int>{4,4}, {5,5}, {6,6}, {7,7}};
     
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

Output: 
```
    Initially:
    x = { {1,1}, {2,2}, {3,3} }
    y = { }
    z = { }
    Copy assignment copies data from x to y:
    x = { {1,1}, {2,2}, {3,3} }
    y = { {1,1}, {2,2}, {3,3} }
    Move assignment moves data from x to z, modifying both x and z:
    x = { }
    z = { {1,1}, {2,2}, {3,3} }
    Assignment of initializer_list w to z:
    w = { {4,4}, {5,5}, {6,6}, {7,7} }
    z = { {4,4}, {5,5}, {6,6}, {7,7} }
```

### Veja também

[ (constructor)](<#/doc/container/multimap/multimap>) |  constrói o `multimap`   
(função membro pública)  