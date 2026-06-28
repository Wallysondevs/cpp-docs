# std::deque&lt;T,Allocator&gt;::insert

```cpp
iterator insert( const_iterator pos, const T& value );  // (1)
iterator insert( const_iterator pos, T&& value );  // (2) (desde C++11)
iterator insert( const_iterator pos,
size_type count, const T& value );  // (3)
template< class InputIt >
iterator insert( const_iterator pos, InputIt first, InputIt last );  // (4)
iterator insert( const_iterator pos, std::initializer_list<T> ilist );  // (5) (desde C++11)
```

Insere elementos na localização especificada no container.

1) Insere uma cópia de `value` antes de `pos`.

2) Insere `value` antes de `pos`, possivelmente usando move semantics. (desde C++11)

3) Insere `count` cópias de `value` antes de `pos`.

4) Insere elementos do range `[`first`, `last`)` antes de `pos`. Esta sobrecarga tem o mesmo efeito que a sobrecarga (3) se `InputIt` for um tipo integral. | (até C++11)
---|---
Esta sobrecarga participa da resolução de sobrecarga apenas se `InputIt` se qualificar como [LegacyInputIterator](<#/doc/named_req/InputIterator>), para evitar ambiguidade com a sobrecarga (3). | (desde C++11)

Se `first` e `last` forem iterators para `*this`, o comportamento é indefinido.

5) Insere elementos da initializer list `ilist` antes de `pos`. (desde C++11)

Todos os iterators (incluindo o iterator [`end()`](<#/doc/container/deque/end>)) são invalidados. Referências também são invalidadas, a menos que `pos ==` `[`begin()`](<#/doc/container/deque/begin>) ou `pos ==` `[`end()`](<#/doc/container/deque/end>), caso em que não são invalidadas.

### Parâmetros

- **pos** — iterator antes do qual o conteúdo será inserido (`pos` pode ser o iterator [`end()`](<#/doc/container/deque/end>))
- **value** — valor do elemento a ser inserido
- **count** — número de elementos a serem inseridos
- **first, last** — o range de elementos a serem inseridos, não podem ser iterators para o container para o qual `insert` é chamado
- **ilist** — [std::initializer_list](<#/doc/utility/initializer_list>) de onde os valores serão inseridos
Requisitos de tipo
-`T` deve satisfazer os requisitos de [CopyAssignable](<#/doc/named_req/CopyAssignable>) e [CopyInsertable](<#/doc/named_req/CopyInsertable>) para usar a sobrecarga (1).
-`T` deve satisfazer os requisitos de [MoveAssignable](<#/doc/named_req/MoveAssignable>) e [MoveInsertable](<#/doc/named_req/MoveInsertable>) para usar a sobrecarga (2).
-`T` deve satisfazer os requisitos de [CopyAssignable](<#/doc/named_req/CopyAssignable>) e [CopyInsertable](<#/doc/named_req/CopyInsertable>) para usar a sobrecarga (3).
-`T` deve satisfazer os requisitos de [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) para usar as sobrecargas (4,5).
-`T` deve satisfazer os requisitos de [Swappable](<#/doc/named_req/Swappable>), [MoveAssignable](<#/doc/named_req/MoveAssignable>), [MoveConstructible](<#/doc/named_req/MoveConstructible>) e [MoveInsertable](<#/doc/named_req/MoveInsertable>) para usar as sobrecargas (4,5). (desde C++17)

### Valor de retorno

1,2) Iterator apontando para o valor inserido.

3) Iterator apontando para o primeiro elemento inserido, ou `pos` se `count == 0`.

4) Iterator apontando para o primeiro elemento inserido, ou `pos` se `first == last`.

5) Iterator apontando para o primeiro elemento inserido, ou `pos` se `ilist` estiver vazia.

### Complexidade

1,2) Constante mais linear no menor das distâncias entre `pos` e qualquer uma das extremidades do container.

3) Linear em `count` mais linear no menor das distâncias entre `pos` e qualquer uma das extremidades do container.

4) Linear em [std::distance](<#/doc/iterator/distance>)(first, last) mais linear no menor das distâncias entre `pos` e qualquer uma das extremidades do container.

5) Linear em `ilist.size()` mais linear no menor das distâncias entre `pos` e qualquer uma das extremidades do container.

### Exceções

Se uma exceção for lançada que não seja por

* o construtor de cópia de `T`,

* o construtor de movimento de `T`, | (desde C++11)

* o operador de atribuição de cópia de `T`,

* o operador de atribuição de movimento de `T`, | (desde C++11)

esta função não tem efeito (garantia de exceção forte).

Se uma exceção for lançada ao inserir um único elemento em qualquer uma das extremidades, esta função não tem efeito (garantia de exceção forte). Caso contrário, se uma exceção for lançada pelo construtor de movimento de um `T` não-[CopyInsertable](<#/doc/named_req/CopyInsertable>), os efeitos são não especificados. | (desde C++11)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <string_view>
    #include <deque>
     
    namespace stq {
    void println(std::string_view rem, const std::deque<int>& container)
    {
        std::cout << rem.substr(0, rem.size() - 2) << '[';
        bool first{true};
        for (const int x : container)
            std::cout << (first ? first = false, "" : ", ") << x;
        std::cout << "]\n";
    }
    }
     
    int main()
    {
        std::deque<int> c1(3, 100);
        stq::println("1. {}", c1);
     
        auto pos = c1.begin();
        pos = c1.insert(pos, 200); // overload (1)
        stq::println("2. {}", c1);
     
        c1.insert(pos, 2, 300); // overload (3)
        stq::println("3. {}", c1);
     
        // reset pos to the begin:
        pos = c1.begin();
     
        std::deque<int> c2(2, 400);
        c1.insert(std::next(pos, 2), c2.begin(), c2.end()); // overload (4)
        stq::println("4. {}", c1);
     
        int arr[] = {501, 502, 503};
        c1.insert(c1.begin(), arr, arr + std::size(arr)); // overload (4)
        stq::println("5. {}", c1);
     
        c1.insert(c1.end(), {601, 602, 603}); // overload (5)
        stq::println("6. {}", c1);
    }
```

Saída:
```
    1. [100, 100, 100]
    2. [200, 100, 100, 100]
    3. [300, 300, 200, 100, 100, 100]
    4. [300, 300, 400, 400, 200, 100, 100, 100]
    5. [501, 502, 503, 300, 300, 400, 400, 200, 100, 100, 100]
    6. [501, 502, 503, 300, 300, 400, 400, 200, 100, 100, 100, 601, 602, 603]
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 149](<https://cplusplus.github.io/LWG/issue149>) | C++98 | as sobrecargas ([3](<#/doc/container/deque/insert>)) e ([4](<#/doc/container/deque/insert>)) não retornavam nada | retorna um iterator
[LWG 247](<https://cplusplus.github.io/LWG/issue247>) | C++98 | a complexidade era especificada apenas para a inserção de um único elemento | também especificada para a inserção de múltiplos elementos

### Ver também

[ emplace](<#/doc/container/deque/emplace>)(C++11) | constrói o elemento no local
(função membro pública)
[ push_front](<#/doc/container/deque/push_front>) | insere um elemento no início
(função membro pública)
[ push_back](<#/doc/container/deque/push_back>) | adiciona um elemento ao final
(função membro pública)
[ inserter](<#/doc/iterator/inserter>) | cria um [std::insert_iterator](<#/doc/iterator/insert_iterator>) de tipo inferido a partir do argumento
(modelo de função)