# std::vector&lt;T,Allocator&gt;::operator=

```cpp
vector& operator=( const vector& other ); |  (1)  |  (constexpr desde C++20)
  // (2)
vector& operator=( vector&& other );  // (desde C++11)
(até C++17)
vector& operator=( vector&& other ) noexcept(/* veja abaixo */);  // (desde C++17)
vector& operator=( std::initializer_list<value_type> ilist );  // (3) (desde C++11)
(constexpr desde C++20)
```

  
Substitui o conteúdo do container.

1) Operador de atribuição por cópia. Substitui o conteúdo por uma cópia do conteúdo de `other`. Se `std::allocator_traits<allocator_type>::propagate_on_container_copy_assignment::value` for `true`, o allocator de `*this` é substituído por uma cópia de `other`. Se o allocator de `*this` após a atribuição for diferente do seu valor antigo, o allocator antigo é usado para desalocar a memória, então o novo allocator é usado para alocá-la antes de copiar os elementos. Caso contrário, a memória pertencente a `*this` pode ser reutilizada quando possível. Em qualquer caso, os elementos originalmente pertencentes a `*this` podem ser destruídos ou substituídos por atribuição por cópia elemento a elemento. | (desde C++11)  
  
2) Operador de atribuição por movimento (move assignment). Substitui o conteúdo pelo de `other` usando move semantics (ou seja, os dados em `other` são movidos de `other` para este container). `other` fica em um estado válido, mas não especificado, depois disso.

Se `std::allocator_traits<allocator_type>::propagate_on_container_move_assignment::value` for `true`, o allocator de `*this` é substituído por uma cópia do de `other`. Se for `false` e os allocators de `*this` e `other` não forem iguais, `*this` não pode assumir a propriedade da memória pertencente a `other` e deve atribuir por movimento (move-assign) cada elemento individualmente, alocando memória adicional usando seu próprio allocator conforme necessário. Em qualquer caso, todos os elementos originalmente pertencentes a `*this` são destruídos ou substituídos por atribuição por movimento elemento a elemento.

3) Substitui o conteúdo pelos identificados pela initializer list `ilist`.

### Parâmetros

other  |  \-  |  outro container para usar como fonte de dados   
---|---|---
ilist  |  \-  |  initializer list para usar como fonte de dados   
  
### Valor de retorno

`*this`

### Complexidade

1) Linear no tamanho de `*this` e `other`.

2) Linear no tamanho de `*this`, a menos que os allocators não sejam iguais e não se propaguem, caso em que é linear no tamanho de `*this` e `other`.

3) Linear no tamanho de `*this` e `ilist`.

### Exceções

```cpp
1-3) Pode lançar exceções definidas pela implementação.  // (até C++17)
1,3) Pode lançar exceções definidas pela implementação. 2) Especificação `noexcept`: noexcept(std::allocator_traits<Allocator>::propagate_on_container_move_assignment::value
|| std::allocator_traits<Allocator>::is_always_equal::value)  // (desde C++17)
```
  
### Notas

Após a atribuição por movimento de container (sobrecarga (2)), a menos que a atribuição por movimento elemento a elemento seja forçada por allocators incompatíveis, referências, ponteiros e iterators (exceto o iterator `end`) para `other` permanecem válidos, mas referem-se a elementos que agora estão em `*this`. O padrão atual faz essa garantia através da declaração geral em `[[container.reqmts]/67]`, e uma garantia mais direta está sob consideração via [LWG issue 2321](<https://cplusplus.github.io/LWG/issue2321>).

### Exemplo

O código a seguir usa `operator=` para atribuir um [std::vector](<#/doc/container/vector>) a outro:

Run this code
```
    #include <initializer_list>
    #include <iostream>
    #include <iterator>
    #include <vector>
     
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
        std::vector<int> x{1, 2, 3}, y, z;
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

Output: 
```
    Initially:
    x = { 1, 2, 3 }
    y = { }
    z = { }
    Copy assignment copies data from x to y:
    x = { 1, 2, 3 }
    y = { 1, 2, 3 }
    Move assignment moves data from x to z, modifying both x and z:
    x = { }
    z = { 1, 2, 3 }
    Assignment of initializer_list w to z:
    w = { 4, 5, 6, 7 }
    z = { 4, 5, 6, 7 }
```

### Veja também

[ (constructor)](<#/doc/container/vector/vector>) |  constrói o `vector`   
(função membro pública)  
[ assign](<#/doc/container/vector/assign>) |  atribui valores ao container   
(função membro pública)