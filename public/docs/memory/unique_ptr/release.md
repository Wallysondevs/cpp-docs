# std::unique_ptr&lt;T,Deleter&gt;::release

```cpp
pointer release() noexcept;  // (desde C++11)
(constexpr desde C++23)
```

Libera a posse do objeto gerenciado, se houver.

[get()](<#/doc/memory/unique_ptr/get>) retorna nullptr após a chamada.

O chamador é responsável por limpar o objeto (por exemplo, usando [get_deleter()](<#/doc/memory/unique_ptr/get_deleter>)).

### Parâmetros

(nenhum)

### Valor de retorno

Ponteiro para o objeto gerenciado ou nullptr se não houver objeto gerenciado, isto é, o valor que seria retornado por [get()](<#/doc/memory/unique_ptr/get>) antes da chamada.

### Exemplo

Execute este código
```
    #include <cassert>
    #include <iostream>
    #include <memory>
     
    struct Foo
    {
        Foo() { std::cout << "Foo\n"; }
        ~Foo() { std::cout << "~Foo\n"; }
    };
     
    // Ownership of the Foo resource is transferred when calling this function
    void legacy_api(Foo* owning_foo)
    {
        std::cout << __func__ << '\n';
        // [legacy code that no one understands or dares touch anymore]
        // [...]
        delete owning_foo;
    }
     
    int main()
    {
        std::unique_ptr<Foo> managed_foo(new Foo);
        // [code that might return or throw or some such]
        // [...]
        legacy_api(managed_foo.release());
     
        assert(managed_foo == nullptr);
    }
```

Saída:
```
    Foo
    legacy_api
    ~Foo
```

### Veja também

[ get](<#/doc/memory/unique_ptr/get>) | retorna um ponteiro para o objeto gerenciado
(função membro pública)
[ get_deleter](<#/doc/memory/unique_ptr/get_deleter>) | retorna o deleter que é usado para a destruição do objeto gerenciado
(função membro pública)
[ reset](<#/doc/memory/unique_ptr/reset>) | substitui o objeto gerenciado
(função membro pública)