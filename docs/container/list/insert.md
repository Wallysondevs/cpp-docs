# std::list&lt;T,Allocator&gt;::insert

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

1) Insere uma cópia de value antes de pos.

2) Insere value antes de pos, possivelmente usando move semantics.

3) Insere count cópias de value antes de pos.

4) Insere elementos do range `[`first`, `last`)` antes de pos. Esta sobrecarga tem o mesmo efeito que a sobrecarga (3) se `InputIt` for um tipo integral. | (ate C++11)
---|---
Esta sobrecarga participa da resolução de sobrecarga apenas se `InputIt` se qualificar como [LegacyInputIterator](<#/doc/named_req/InputIterator>), para evitar ambiguidade com a sobrecarga (3). | (desde C++11)

Se first e last forem iterators para *this, o comportamento é indefinido.

5) Insere elementos da initializer list ilist antes de pos.

Nenhum iterator ou referência é invalidado.

### Parâmetros

- **pos** — iterator antes do qual o conteúdo será inserido (pos pode ser o iterator [`end()`](<#/doc/container/list/end>))
- **value** — valor do elemento a ser inserido
- **count** — número de elementos a serem inseridos
- **first, last** — o range de elementos a serem inseridos, não podem ser iterators para o container no qual insert é chamado
- **ilist** — [std::initializer_list](<#/doc/utility/initializer_list>) de onde os valores serão inseridos
Requisitos de tipo
-`T` deve atender aos requisitos de [CopyInsertable](<#/doc/named_req/CopyInsertable>) para usar a sobrecarga (1).
-`T` deve atender aos requisitos de [MoveInsertable](<#/doc/named_req/MoveInsertable>) para usar a sobrecarga (2).
-`T` deve atender aos requisitos de [CopyAssignable](<#/doc/named_req/CopyAssignable>) e [CopyInsertable](<#/doc/named_req/CopyInsertable>) para usar a sobrecarga (3).
-`T` deve atender aos requisitos de [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) para usar as sobrecargas (4,5).

### Valor de retorno

1,2) Iterator apontando para o valor inserido.

3) Iterator apontando para o primeiro elemento inserido, ou pos se count == 0.

4) Iterator apontando para o primeiro elemento inserido, ou pos se first == last.

5) Iterator apontando para o primeiro elemento inserido, ou pos se ilist estiver vazio.

### Complexidade

1,2) Constante.

3) Linear em count.

4) Linear em [std::distance](<#/doc/iterator/distance>)(first, last).

5) Linear em ilist.size().

### Exceções

Se uma exceção for lançada por qualquer motivo, essas funções não terão efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <string_view>
    #include <list>
    
    namespace stq {
    void println(std::string_view rem, const std::list<int>& container)
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
        std::list<int> c1(3, 100);
        stq::println("1. {}", c1);
    
        auto pos = c1.begin();
        pos = c1.insert(pos, 200); // overload (1)
        stq::println("2. {}", c1);
    
        c1.insert(pos, 2, 300); // overload (3)
        stq::println("3. {}", c1);
    
        // reset pos to the begin:
        pos = c1.begin();
    
        std::list<int> c2(2, 400);
        c1.insert(std::next(pos, 2), c2.begin(), c2.end()); // overload (4)
        stq::println("4. {}", c1);
    
        int arr[] = {501, 502, 503};
        c1.insert(c1.begin(), arr, arr + std::size(arr)); // overload (4)
        stq::println("5. {}", c1);
    
        c1.insert(c1.end(), {601, 602, 603}); // overload (5)
        stq::println("6. {}", c1);
    }
```

Output:
```
    1. [100, 100, 100]
    2. [200, 100, 100, 100]
    3. [300, 300, 200, 100, 100, 100]
    4. [300, 300, 400, 400, 200, 100, 100, 100]
    5. [501, 502, 503, 300, 300, 400, 400, 200, 100, 100, 100]
    6. [501, 502, 503, 300, 300, 400, 400, 200, 100, 100, 100, 601, 602, 603]
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 149](<https://cplusplus.github.io/LWG/issue149>) | C++98 | sobrecargas ([3](<#/doc/container/list/insert>)) e ([4](<#/doc/container/list/insert>)) não retornavam nada | retorna um iterator

### Veja também

[ emplace](<#/doc/container/list/emplace>)(C++11) | constrói elemento no local
(função membro pública)
[ push_front](<#/doc/container/list/push_front>) | insere um elemento no início
(função membro pública)
[ push_back](<#/doc/container/list/push_back>) | adiciona um elemento ao final
(função membro pública)
[ inserter](<#/doc/iterator/inserter>) | cria um [std::insert_iterator](<#/doc/iterator/insert_iterator>) de tipo inferido a partir do argumento
(template de função)