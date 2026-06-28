# std::forward_list&lt;T,Allocator&gt;::insert_after

```cpp
iterator insert_after( const_iterator pos, const T& value );  // (1) (desde C++11)
iterator insert_after( const_iterator pos, T&& value );  // (2) (desde C++11)
iterator insert_after( const_iterator pos, size_type count, const T& value );  // (3) (desde C++11)
template< class InputIt >
iterator insert_after( const_iterator pos, InputIt first, InputIt last );  // (4) (desde C++11)
iterator insert_after( const_iterator pos, std::initializer_list<T> ilist );  // (5) (desde C++11)
```

Insere elementos após a posição especificada no container.

1,2) Insere value após o elemento apontado por pos.

3) Insere count cópias de value após o elemento apontado por pos.

4) Insere elementos do range `[`first`, `last`)` após o elemento apontado por pos. O comportamento é indefinido se first e last são iteradores de *this.

5) Insere elementos da initializer list ilist.

Nenhum iterator ou referência é invalidado.

### Parâmetros

- **pos** — iterator após o qual o conteúdo será inserido
- **value** — valor do elemento a ser inserido
- **count** — número de cópias a serem inseridas
- **first, last** — o range de elementos a serem inseridos
- **ilist** — initializer list de onde os valores serão inseridos
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).

### Valor de retorno

1,2) Iterator para o elemento inserido.

3) Iterator para o último elemento inserido, ou pos se count == 0.

4) Iterator para o último elemento inserido, ou pos se first == last.

5) Iterator para o último elemento inserido, ou pos se ilist estiver vazia.

### Exceções

Se uma exceção for lançada por qualquer motivo, essas funções não têm efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Complexidade

1,2) Constante.

3) Linear em count.

4) Linear em [std::distance](<#/doc/iterator/distance>)(first, last).

5) Linear em ilist.size().

### Exemplo

Execute este código
```cpp
    #include <forward_list>
    #include <iostream>
    #include <string>
    #include <vector>
    
    void print(const std::forward_list<int>& list)
    {
        std::cout << "list: {";
        for (char comma[3] = {'\0', ' ', '\0'}; int i : list)
        {
            std::cout << comma << i;
            comma[0] = ',';
        }
        std::cout << "}\n";
    }
    
    int main()
    {
        std::forward_list<int> ints{1, 2, 3, 4, 5};
        print(ints);
    
        // insert_after (2)
        auto beginIt = ints.begin();
        ints.insert_after(beginIt, -6);
        print(ints);
    
        // insert_after (3)
        auto anotherIt = beginIt;
        ++anotherIt;
        anotherIt = ints.insert_after(anotherIt, 2, -7);
        print(ints);
    
        // insert_after (4)
        const std::vector<int> v = {-8, -9, -10};
        anotherIt = ints.insert_after(anotherIt, v.cbegin(), v.cend());
        print(ints);
    
        // insert_after (5)
        ints.insert_after(anotherIt, {-11, -12, -13, -14});
        print(ints);
    }
```

Saída:
```
    list: {1, 2, 3, 4, 5}
    list: {1, -6, 2, 3, 4, 5}
    list: {1, -6, -7, -7, 2, 3, 4, 5}
    list: {1, -6, -7, -7, -8, -9, -10, 2, 3, 4, 5}
    list: {1, -6, -7, -7, -8, -9, -10, -11, -12, -13, -14, 2, 3, 4, 5}
```

### Veja também

[ emplace_after](<#/doc/container/forward_list/emplace_after>) | constrói elementos no local após um elemento
(função membro pública)
[ push_front](<#/doc/container/forward_list/push_front>) | insere um elemento no início
(função membro pública)