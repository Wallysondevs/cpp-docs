# std::list&lt;T,Allocator&gt;::operator=

```cpp
list& operator=( const list& other );  // (1)
  // (2)
list& operator=( list&& other );  // (desde C++11)
(até C++17)
list& operator=( list&& other ) noexcept(/* see below */);  // (desde C++17)
list& operator=( std::initializer_list<value_type> ilist );  // (3) (desde C++11)
```

  
Substitui o conteúdo do contêiner.

1) Operador de atribuição por cópia. Substitui o conteúdo por uma cópia do conteúdo de `other`. Se `std::allocator_traits<allocator_type>::propagate_on_container_copy_assignment::value` for `true`, o alocador de `*this` é substituído por uma cópia de `other`. Se o alocador de `*this` após a atribuição for diferente do seu valor antigo, o alocador antigo é usado para desalocar a memória, então o novo alocador é usado para alocá-la antes de copiar os elementos. Caso contrário, a memória de propriedade de `*this` pode ser reutilizada quando possível. Em qualquer caso, os elementos originalmente pertencentes a `*this` podem ser destruídos ou substituídos por atribuição por cópia elemento a elemento. | (desde C++11)  
  
2) Operador de atribuição por movimento. Substitui o conteúdo pelo de `other` usando semântica de movimento (ou seja, os dados em `other` são movidos de `other` para este contêiner). `other` fica em um estado válido, mas não especificado, depois disso.

Se `std::allocator_traits<allocator_type>::propagate_on_container_move_assignment::value` for `true`, o alocador de `*this` é substituído por uma cópia do de `other`. Se for `false` e os alocadores de `*this` e `other` não forem iguais, `*this` não pode assumir a propriedade da memória de `other` e deve atribuir por movimento cada elemento individualmente, alocando memória adicional usando seu próprio alocador conforme necessário. Em qualquer caso, todos os elementos originalmente pertencentes a `*this` são destruídos ou substituídos por atribuição por movimento elemento a elemento.

3) Substitui o conteúdo pelos identificados pela lista de inicializadores `ilist`.

### Parâmetros

other  |  \-  |  outro contêiner para usar como fonte de dados   
---|---|---
ilist  |  \-  |  lista de inicializadores para usar como fonte de dados   
  
### Valor de retorno

`*this`

### Complexidade

1) Linear no tamanho de `*this` e `other`.

2) Linear no tamanho de `*this`, a menos que os alocadores não sejam iguais e não se propaguem, caso em que é linear no tamanho de `*this` e `other`.

3) Linear no tamanho de `*this` e `ilist`.

### Exceções

```cpp
1-3) Pode lançar exceções definidas pela implementação.  // (até C++17)
1,3) Pode lançar exceções definidas pela implementação. 2) Especificação `noexcept`: noexcept(std::allocator_traits<Allocator>::is_always_equal::value)  // (desde C++17)
```
  
### Notas

Após a atribuição por movimento de contêiner (sobrecarga (2)), a menos que a atribuição por movimento elemento a elemento seja forçada por alocadores incompatíveis, referências, ponteiros e iteradores (exceto o iterador `end`) para `other` permanecem válidos, mas referem-se a elementos que agora estão em `*this`. O padrão atual faz essa garantia através da declaração abrangente em `[[container.reqmts]/67](<https://eel.is/c++draft/container.reqmts#67>)`, e uma garantia mais direta está em consideração via `[LWG issue 2321](<https://cplusplus.github.io/LWG/issue2321>)`.

### Exemplo

O código a seguir usa `operator=` para atribuir uma `std::list` a outra:

Run this code
```
    #include <initializer_list>
    #include <iostream>
    #include <iterator>
    #include <list>
     
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
        std::list<int> x{1, 2, 3}, y, z;
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

Saída: 
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

### Ver também

[ (constructor)](<#/doc/container/list/list>) |  constrói a `list`   
(public member function)  
[ assign](<#/doc/container/list/assign>) |  atribui valores ao contêiner   
(public member function)