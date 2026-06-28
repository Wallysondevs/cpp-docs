# std::vector&lt;T,Allocator&gt;::insert

```cpp
iterator insert( const_iterator pos, const T& value ); | (1) | (constexpr desde C++20)
iterator insert( const_iterator pos, T&& value );  // (2) (desde C++11)
(constexpr desde C++20)
iterator insert( const_iterator pos,
size_type count, const T& value ); | (3) | (constexpr desde C++20)
template< class InputIt >
iterator insert( const_iterator pos, InputIt first, InputIt last ); | (4) | (constexpr desde C++20)
iterator insert( const_iterator pos, std::initializer_list<T> ilist );  // (5) (desde C++11)
(constexpr desde C++20)
```

Insere elementos na localização especificada no container.

1) Insere uma cópia de value antes de pos.

2) Insere value antes de pos, possivelmente usando move semantics.

3) Insere count cópias de value antes de pos.

4) Insere elementos do range `[`first`, `last`)` antes de pos. Esta sobrecarga tem o mesmo efeito que a sobrecarga (3) se `InputIt` for um tipo integral. | (até C++11)
---|---
Esta sobrecarga participa da resolução de sobrecarga apenas se `InputIt` se qualificar como [LegacyInputIterator](<#/doc/named_req/InputIterator>), para evitar ambiguidade com a sobrecarga (3). | (desde C++11)

Se first e last forem iterators para *this, o comportamento é indefinido.

5) Insere elementos da initializer list ilist antes de pos.

Se após a operação o novo [`size()`](<#/doc/container/vector/size>) for maior que o antigo [`capacity()`](<#/doc/container/vector/capacity>), ocorre uma realocação, caso em que todos os iterators (incluindo o iterator [`end()`](<#/doc/container/vector/end>)) e todas as referências aos elementos são invalidados. Caso contrário, apenas os iterators e referências antes do ponto de inserção permanecem válidos.

### Parâmetros

- **pos** — iterator antes do qual o conteúdo será inserido (pos pode ser o iterator [`end()`](<#/doc/container/vector/end>))
- **value** — valor do elemento a ser inserido
- **count** — número de elementos a serem inseridos
- **first, last** — o range de elementos a serem inseridos, não podem ser iterators para o container no qual insert é chamado
- **ilist** — [std::initializer_list](<#/doc/utility/initializer_list>) de onde inserir os valores

Requisitos de tipo
-`T` deve atender aos requisitos de [CopyAssignable](<#/doc/named_req/CopyAssignable>) e [CopyInsertable](<#/doc/named_req/CopyInsertable>) para usar a sobrecarga (1).
-`T` deve atender aos requisitos de [MoveAssignable](<#/doc/named_req/MoveAssignable>) e [MoveInsertable](<#/doc/named_req/MoveInsertable>) para usar a sobrecarga (2).
-`T` deve atender aos requisitos de [CopyAssignable](<#/doc/named_req/CopyAssignable>) e [CopyInsertable](<#/doc/named_req/CopyInsertable>) para usar a sobrecarga (3).
-`T` deve atender aos requisitos de [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) para usar as sobrecargas (4,5).
-`T` deve atender aos requisitos de [MoveAssignable](<#/doc/named_req/MoveAssignable>) e [MoveInsertable](<#/doc/named_req/MoveInsertable>) para usar a sobrecarga (4). Requerido apenas se `InputIt` satisfizer [LegacyInputIterator](<#/doc/named_req/InputIterator>) mas não [LegacyForwardIterator](<#/doc/named_req/ForwardIterator>). (até C++17)
-`T` deve atender aos requisitos de [Swappable](<#/doc/named_req/Swappable>), [MoveAssignable](<#/doc/named_req/MoveAssignable>), [MoveConstructible](<#/doc/named_req/MoveConstructible>) e [MoveInsertable](<#/doc/named_req/MoveInsertable>) para usar as sobrecargas (4,5). (desde C++17)

### Valor de retorno

1,2) Iterator apontando para o valor inserido.

3) Iterator apontando para o primeiro elemento inserido, ou pos se count == 0.

4) Iterator apontando para o primeiro elemento inserido, ou pos se first == last.

5) Iterator apontando para o primeiro elemento inserido, ou pos se ilist estiver vazio.

### Complexidade

1,2) Constante mais linear na distância entre pos e o final do container.

3) Linear em count mais linear na distância entre pos e o final do container.

4) Linear em [std::distance](<#/doc/iterator/distance>)(first, last) mais linear na distância entre pos e o final do container.

5) Linear em ilist.size() mais linear na distância entre pos e o final do container.

### Exceções

Se uma exceção for lançada que não seja por

* o construtor de cópia de `T`,

* o construtor de move de `T`,

| (desde C++11)
* o operador de atribuição de cópia de `T`,

* o operador de atribuição de move de `T`,

| (desde C++11)
* qualquer operação de `InputIt`,

estas funções não têm efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

Se uma exceção for lançada ao inserir um único elemento no final, e `T` for [CopyInsertable](<#/doc/named_req/CopyInsertable>) em *this ou [std::is_nothrow_move_constructible](<#/doc/types/is_move_constructible>)&lt;T&gt;::value for true, esta função não tem efeito (garantia de exceção forte). Caso contrário, se uma exceção for lançada pelo construtor de move de um `T` não [CopyInsertable](<#/doc/named_req/CopyInsertable>), os efeitos são não especificados. | (desde C++11)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <string_view>
    #include <vector>
    
    namespace stq {
    void println(std::string_view rem, const std::vector<int>& container)
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
        std::vector<int> c1(3, 100);
        stq::println("1. {}", c1);
    
        auto pos = c1.begin();
        pos = c1.insert(pos, 200); // overload (1)
        stq::println("2. {}", c1);
    
        c1.insert(pos, 2, 300); // overload (3)
        stq::println("3. {}", c1);
    
        // pos no longer valid, get a new one:
        pos = c1.begin();
    
        std::vector<int> c2(2, 400);
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
[LWG 149](<https://cplusplus.github.io/LWG/issue149>) | C++98 | as sobrecargas ([3](<#/doc/container/vector/insert>)) e ([4](<#/doc/container/vector/insert>)) não retornavam nada | retorna um iterator
[LWG 247](<https://cplusplus.github.io/LWG/issue247>) | C++98 | a complexidade era especificada apenas para a sobrecarga ([3](<#/doc/container/vector/insert>)) | especificada para todas as sobrecargas
[LWG 406](<https://cplusplus.github.io/LWG/issue406>) | C++98 | a garantia de exceção forte também se aplicava se a exceção fosse lançada por uma operação de `InputIt` | nenhuma garantia neste caso

### Veja também

[ emplace](<#/doc/container/vector/emplace>)(C++11) | constrói o elemento no local
(função membro pública)
[ push_back](<#/doc/container/vector/push_back>) | adiciona um elemento ao final
(função membro pública)
[ inserter](<#/doc/iterator/inserter>) | cria um [std::insert_iterator](<#/doc/iterator/insert_iterator>) de tipo inferido a partir do argumento
(template de função)