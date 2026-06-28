# std::inplace_vector&lt;T,N&gt;::insert

```cpp
constexpr iterator insert( const_iterator pos, const T& value );  // (1) (desde C++26)
constexpr iterator insert( const_iterator pos, T&& value );  // (2) (desde C++26)
constexpr iterator insert( const_iterator pos, size_type count, const T& value );  // (3) (desde C++26)
template< class InputIt >
constexpr iterator insert( const_iterator pos, InputIt first, InputIt last );  // (4) (desde C++26)
constexpr iterator insert( const_iterator pos, std::initializer_list<T> ilist );  // (5) (desde C++26)
```

Insere elementos na localização especificada no container.

1) Insere uma cópia de `value` antes de `pos`.

2) Insere `value` antes de `pos`, possivelmente usando move semantics.

3) Insere `count` cópias de `value` antes de `pos`.

4) Insere elementos do range `[`first`, `last`)` antes de `pos`. Esta sobrecarga participa da overload resolution apenas se `InputIt` for um [LegacyInputIterator](<#/doc/named_req/InputIterator>) (para evitar ambiguidade com a sobrecarga (3)).

Cada iterator em `[`first`, `last`)` é desreferenciado uma vez.

Se `first` e `last` forem iterators para `*this`, o comportamento é indefinido.

5) Insere elementos da initializer list `ilist` antes de `pos`. Equivalente a: `insert(pos, ilist.begin(), ilist.end());`.

### Parameters

- **pos** — iterator antes do qual o conteúdo será inserido (`pos` pode ser o iterator [`end()`](<#/doc/container/inplace_vector/end>))
- **value** — valor do elemento a ser inserido
- **count** — número de elementos a serem inseridos
- **first, last** — o range de elementos a serem inseridos
- **ilist** — [std::initializer_list](<#/doc/utility/initializer_list>) de onde os valores serão inseridos
Requisitos de tipo
-`T` deve satisfazer os requisitos de [CopyInsertable](<#/doc/named_req/CopyInsertable>) para usar a sobrecarga (1).
-`T` deve satisfazer os requisitos de [MoveInsertable](<#/doc/named_req/MoveInsertable>) para usar a sobrecarga (2).
-`T` deve satisfazer os requisitos de [CopyAssignable](<#/doc/named_req/CopyAssignable>) e [CopyInsertable](<#/doc/named_req/CopyInsertable>) para usar a sobrecarga (3).
-`T` deve satisfazer os requisitos de [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>) para usar as sobrecargas (4,5).

### Return value

1,2) Iterator apontando para o valor inserido.

3) Iterator apontando para o primeiro elemento inserido, ou `pos` se `count == 0`.

4) Iterator apontando para o primeiro elemento inserido, ou `pos` se `first == last`.

5) Iterator apontando para o primeiro elemento inserido, ou `pos` se `ilist` estiver vazio.

### Complexity

Linear no número de elementos inseridos mais a distância entre `pos` e [`end()`](<#/doc/container/inplace_vector/end>) do container.

### Exceptions

  * Lança [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se antes da invocação `size() == capacity()`. A função não tem efeitos ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).
  * Qualquer exceção lançada pela inicialização do elemento inserido ou por qualquer operação de [LegacyInputIterator](<#/doc/named_req/InputIterator>). Elementos em `[`​0​`, `pos`)` não são modificados.

### Example

Execute este código
```cpp
    #include <initializer_list>
    #include <inplace_vector>
    #include <iterator>
    #include <new>
    #include <print>
    
    int main()
    {
        std::inplace_vector<int, 14> v(3, 100);
        std::println("1. {}", v);
    
        auto pos = v.begin();
        pos = v.insert(pos, 200); // overload (1)
        std::println("2. {}", v);
    
        v.insert(pos, 2, 300); // overload (3)
        std::println("3. {}", v);
    
        int arr[] = {501, 502, 503};
        v.insert(v.begin(), arr, arr + std::size(arr)); // overload (4)
        std::println("4. {}", v);
    
        v.insert(v.end(), {601, 602, 603}); // overload (5)
        std::println("5. {}", v);
    
        const auto list = {-13, -12, -11};
        try
        {
            v.insert(v.begin(), list); // throws: no space
        }
        catch(const std::bad_alloc&)
        {
            std::println("bad_alloc: v.capacity()={} < v.size()={} + list.size()={}",
                         v.capacity(), v.size(), list.size());
        }
    }
```

Output:
```
    1. [100, 100, 100]
    2. [200, 100, 100, 100]
    3. [300, 300, 200, 100, 100, 100]
    4. [501, 502, 503, 300, 300, 200, 100, 100, 100]
    5. [501, 502, 503, 300, 300, 200, 100, 100, 100, 601, 602, 603]
    bad_alloc: v.capacity()=14 < v.size()=12 + list.size()=3
```

### See also

[ emplace](<#/doc/container/inplace_vector/emplace>) | constrói elemento no local
(função membro pública)
[ insert_range](<#/doc/container/inplace_vector/insert_range>) | insere um range de elementos
(função membro pública)