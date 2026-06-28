# std::unique_ptr&lt;T,Deleter&gt;::~unique_ptr

```cpp
~unique_ptr();  // (desde C++11)
(constexpr desde C++23)
```

Se [get()](<#/doc/memory/unique_ptr/get>) `==` nullptr não há efeitos. Caso contrário, o objeto possuído é destruído via [get_deleter()](<#/doc/memory/unique_ptr/get_deleter>)`(`[get()](<#/doc/memory/unique_ptr/get>)`)`.

Requer que `get_deleter()(get())` não lance exceções.

### Observações

Embora `std::unique_ptr<T>` com o deleter padrão possa ser construído com um [tipo incompleto](<#/doc/language/incomplete_type>) `T`, o tipo `T` deve ser completo no ponto do código onde o destrutor é chamado.

### Exemplo

O programa a seguir demonstra o uso de um deleter customizado.

Run this code
```
    #include <iostream>
    #include <memory>
     
    int main ()
    {
        auto deleter = 
        {
            std::cout << "[deleter called]\n";
            delete ptr;
        };
     
        std::unique_ptr<int, decltype(deleter)> uniq(new int, deleter);
        std::cout << (uniq ? "not empty\n" : "empty\n");
        uniq.reset();
        std::cout << (uniq ? "not empty\n" : "empty\n");
    }
```

Output:
```
    not empty
    [deleter called]
    empty
```