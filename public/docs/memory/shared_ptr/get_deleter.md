# std::get_deleter

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class Deleter, class T >
Deleter* get_deleter( const std::shared_ptr<T>& p ) noexcept;
```

Acesso ao deleter de p. Se o shared pointer p possui um deleter do tipo Deleter não qualificado por cv (por exemplo, se foi criado com um dos construtores que recebem um deleter como parâmetro), então retorna um ponteiro para o deleter. Caso contrário, retorna um ponteiro nulo.

### Parâmetros

- **p** — um shared pointer cujo deleter precisa ser acessado

### Valor de retorno

Um ponteiro para o deleter possuído ou [`nullptr`](<#/doc/language/nullptr>). O ponteiro retornado é válido pelo menos enquanto houver pelo menos uma instância de [shared_ptr](<#/doc/memory/shared_ptr>) que o possua.

### Observações

O ponteiro retornado pode sobreviver ao último [shared_ptr](<#/doc/memory/shared_ptr>) se, por exemplo, [std::weak_ptr](<#/doc/memory/weak_ptr>)s permanecerem e a implementação não destruir o deleter até que todo o bloco de controle seja destruído.

### Exemplo

Demonstra que o deleter de [std::shared_ptr](<#/doc/memory/shared_ptr>) é independente do tipo do [shared_ptr](<#/doc/memory/shared_ptr>).

Execute este código
```
    #include <iostream>
    #include <memory>
    
    struct Foo { int i; };
    void foo_deleter(Foo* p)
    {
        std::cout << "foo_deleter called!\n";
        delete p;
    }
    
    int main()
    {
        std::shared_ptr<int> aptr;
    
        {
            // create a shared_ptr that owns a Foo and a deleter
            auto foo_p = new Foo;
            std::shared_ptr<Foo> r(foo_p, foo_deleter);
            aptr = std::shared_ptr<int>(r, &r->i); // aliasing ctor
            // aptr is now pointing to an int, but managing the whole Foo
        } // r gets destroyed (deleter not called)
    
        // obtain pointer to the deleter:
        if (auto del_p = std::get_deleter<void(*)(Foo*)>(aptr))
        {
            std::cout << "shared_ptr<int> owns a deleter\n";
            if (*del_p == foo_deleter)
                std::cout << "...and it equals &foo_deleter\n";
        }
        else
            std::cout << "The deleter of shared_ptr<int> is null!\n";
    } // deleter called here
```

Saída:
```
    shared_ptr<int> owns a deleter
    ...and it equals &foo_deleter
    foo_deleter called!
```

### Veja também

[ (construtor)](<#/doc/memory/shared_ptr/shared_ptr>) | Construtores de [std::shared_ptr](<#/doc/memory/shared_ptr>)
(função membro pública)
[ get_deleter](<#/doc/memory/unique_ptr/get_deleter>) | retorna o deleter que é usado para a destruição do objeto gerenciado
(função membro pública de `std::unique_ptr<T,Deleter>`)