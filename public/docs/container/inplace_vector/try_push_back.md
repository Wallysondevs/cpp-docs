# std::inplace_vector&lt;T,N&gt;::try_push_back

```cpp
constexpr pointer try_push_back( const T& value );  // (1) (desde C++26)
constexpr pointer try_push_back( T&& value );  // (2) (desde C++26)
```

Adiciona condicionalmente o valor do elemento fornecido ao final do container.

Se size() == capacity() for verdadeiro, não há efeitos. Caso contrário, adiciona um objeto do tipo `T`:

1) O novo elemento é inicializado como uma cópia de value.

2) value é movido para o novo elemento.

Nenhum iterator ou referência é invalidado, exceto [`end()`](<#/doc/container/inplace_vector/end>), que é invalidado se a inserção ocorrer.

### Parameters

- **value** — o valor do elemento a ser adicionado
Requisitos de tipo
-`T` deve satisfazer os requisitos de [EmplaceConstructible](<#/doc/named_req/EmplaceConstructible>).

### Valor de retorno

[std::addressof](<#/doc/memory/addressof>)(back()) se size() < capacity(), nullptr caso contrário.

### Complexidade

Constante.

### Exceções

Qualquer exceção lançada pela inicialização do elemento inserido.

Se uma exceção for lançada por qualquer motivo, essas funções não têm efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Notas

| Esta seção está incompleta
Razão: Explicar o propósito desta API.

### Exemplo

Run this code
```
    #include <cassert>
    #include <inplace_vector>
    #include <string>
    
    int main()
    {
        std::inplace_vector<std::string, 2> pets;
        std::string dog{"dog"};
    
        std::string* p1 = pets.try_push_back("cat"); // overload (1)
        assert(*p1 == "cat" and pets.size() == 1);
    
        std::string* p2 = pets.try_push_back(std::move(dog)); // overload (2)
        assert(*p2 == "dog" and pets.size() == 2);
    
        assert(pets[0] == "cat" and pets[1] == "dog");
        assert(pets.size() == pets.capacity());
    
        std::string* p3 = pets.try_push_back("bug");
        assert(p3 == nullptr and pets.size() == 2);
    }
```

### Ver também

[ push_back](<#/doc/container/inplace_vector/push_back>) | adiciona um elemento ao final
(função membro pública)
[ emplace_back](<#/doc/container/inplace_vector/emplace_back>) | constrói um elemento no local ao final
(função membro pública)
[ append_range](<#/doc/container/inplace_vector/append_range>) | adiciona um range de elementos ao final
(função membro pública)
[ try_emplace_back](<#/doc/container/inplace_vector/try_emplace_back>) | tenta construir um elemento no local ao final
(função membro pública)
[ try_append_range](<#/doc/container/inplace_vector/try_append_range>) | tenta adicionar um range de elementos ao final
(função membro pública)
[ unchecked_emplace_back](<#/doc/container/inplace_vector/unchecked_emplace_back>) | constrói incondicionalmente um elemento no local ao final
(função membro pública)
[ unchecked_push_back](<#/doc/container/inplace_vector/unchecked_push_back>) | adiciona incondicionalmente um elemento ao final
(função membro pública)
[ pop_back](<#/doc/container/inplace_vector/pop_back>) | remove o último elemento
(função membro pública)
[ back_inserter](<#/doc/iterator/back_inserter>) | cria um [std::back_insert_iterator](<#/doc/iterator/back_insert_iterator>) de tipo inferido a partir do argumento
(modelo de função)