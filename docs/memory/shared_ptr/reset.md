# std::shared_ptr&lt;T&gt;::reset

```cpp
void reset() noexcept;  // (1) (desde C++11)
template< class Y >
void reset( Y* ptr );  // (2) (desde C++11)
template< class Y, class Deleter >
void reset( Y* ptr, Deleter d );  // (3) (desde C++11)
template< class Y, class Deleter, class Alloc >
void reset( Y* ptr, Deleter d, Alloc alloc );  // (4) (desde C++11)
```

Substitui o objeto gerenciado por um objeto apontado por ptr. Um deleter opcional d pode ser fornecido, que é posteriormente usado para destruir o novo objeto quando nenhum objeto `shared_ptr` o possuir. Por padrão, a expressão [`delete`](<#/doc/language/delete>) é usada como deleter. A expressão [`delete`](<#/doc/language/delete>) apropriada correspondente ao tipo fornecido é sempre selecionada, esta é a razão pela qual a função é implementada como um template usando um parâmetro `Y` separado.

Se *this já possui um objeto e é o último `shared_ptr` a possuí-lo, o objeto é destruído através do deleter possuído.

Se o objeto apontado por ptr já for possuído, a função geralmente resulta em comportamento indefinido.

1) Libera a posse do objeto gerenciado, se houver. Após a chamada, *this não gerencia nenhum objeto. Equivalente a shared_ptr().swap(*this);.

2-4) Substitui o objeto gerenciado por um objeto apontado por ptr. `Y` deve ser um tipo completo e implicitamente conversível para `T`. Adicionalmente:

2) Usa a expressão delete como o deleter. Uma expressão delete válida deve estar disponível, ou seja, delete ptr deve ser bem formado, ter comportamento bem definido e não lançar exceções. Equivalente a shared_ptr&lt;T&gt;(ptr).swap(*this);.

3) Usa o deleter d especificado como o deleter. `Deleter` deve ser chamável para o tipo `T`, ou seja, d(ptr) deve ser bem formado, ter comportamento bem definido e não lançar exceções. `Deleter` deve ser [CopyConstructible](<#/doc/named_req/CopyConstructible>), e seu construtor de cópia e destrutor não devem lançar exceções. Equivalente a shared_ptr&lt;T&gt;(ptr, d).swap(*this);.

4) O mesmo que (3), mas adicionalmente usa uma cópia de alloc para alocação de dados para uso interno. `Alloc` deve ser um [Allocator](<#/doc/named_req/Allocator>). O construtor de cópia e o destrutor não devem lançar exceções. Equivalente a shared_ptr&lt;T&gt;(ptr, d, alloc).swap(*this);.

### Parâmetros

- **ptr** — ponteiro para um objeto para adquirir a posse
- **d** — deleter a ser armazenado para a exclusão do objeto
- **alloc** — allocator a ser usado para alocações internas

### Valor de retorno

(nenhum)

### Exceções

2) [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a memória adicional necessária não puder ser obtida. Pode lançar exceção definida pela implementação para outros erros. delete ptr é chamado se uma exceção ocorrer.

3,4) [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a memória adicional necessária não puder ser obtida. Pode lançar exceção definida pela implementação para outros erros. d(ptr) é chamado se uma exceção ocorrer.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <memory>
     
    struct Foo
    {
        Foo(int n = 0) noexcept : bar(n)
        {
            std::cout << "Foo::Foo(), bar = " << bar << " @ " << this << '\n';
        }
        ~Foo()
        {
            std::cout << "Foo::~Foo(), bar = " << bar << " @ " << this << '\n';
        }
        int getBar() const noexcept { return bar; }
    private:
        int bar;
    };
     
    int main()
    {
        std::cout << "1) unique ownership\n";
        {
            std::shared_ptr<Foo> sptr = std::make_shared<Foo>(100);
     
            std::cout << "Foo::bar = " << sptr->getBar() << ", use_count() = "
                      << sptr.use_count() << '\n';
     
            // Reset the shared_ptr without handing it a fresh instance of Foo.
            // The old instance will be destroyed after this call.
            std::cout << "call sptr.reset()...\n";
            sptr.reset(); // calls Foo's destructor here
            std::cout << "After reset(): use_count() = " << sptr.use_count()
                      << ", sptr = " << sptr << '\n';
        }   // No call to Foo's destructor, it was done earlier in reset().
     
        std::cout << "\n2) unique ownership\n";
        {
            std::shared_ptr<Foo> sptr = std::make_shared<Foo>(200);
     
            std::cout << "Foo::bar = " << sptr->getBar() << ", use_count() = "
                      << sptr.use_count() << '\n';
     
            // Reset the shared_ptr, hand it a fresh instance of Foo.
            // The old instance will be destroyed after this call.
            std::cout << "call sptr.reset()...\n";
            sptr.reset(new Foo{222});
            std::cout << "After reset(): use_count() = " << sptr.use_count()
                      << ", sptr = " << sptr << "\nLeaving the scope...\n";
        }   // Calls Foo's destructor.
     
        std::cout << "\n3) multiple ownership\n";
        {
            std::shared_ptr<Foo> sptr1 = std::make_shared<Foo>(300);
            std::shared_ptr<Foo> sptr2 = sptr1;
            std::shared_ptr<Foo> sptr3 = sptr2;
     
            std::cout << "Foo::bar = " << sptr1->getBar() << ", use_count() = "
                      << sptr1.use_count() << '\n';
     
            // Reset the shared_ptr sptr1, hand it a fresh instance of Foo.
            // The old instance will stay shared between sptr2 and sptr3.
            std::cout << "call sptr1.reset()...\n";
            sptr1.reset(new Foo{333});
     
            std::cout << "After reset():\n"
                      << "sptr1.use_count() = " << sptr1.use_count()
                      << ", sptr1 @ " << sptr1 << '\n'
                      << "sptr2.use_count() = " << sptr2.use_count()
                      << ", sptr2 @ " << sptr2 << '\n'
                      << "sptr3.use_count() = " << sptr3.use_count()
                      << ", sptr3 @ " << sptr3 << '\n'
                      << "Leaving the scope...\n";
        }   // Calls two destructors of: 1) Foo owned by sptr1,
            // 2) Foo shared between sptr2/sptr3.
    }
```

Saída possível:
```
    1) unique ownership
    Foo::Foo(), bar = 100 @ 0x23c5040
    Foo::bar = 100, use_count() = 1
    call sptr.reset()...
    Foo::~Foo(), bar = 100 @ 0x23c5040
    After reset(): use_count() = 0, sptr = 0
     
    2) unique ownership
    Foo::Foo(), bar = 200 @ 0x23c5040
    Foo::bar = 200, use_count() = 1
    call sptr.reset()...
    Foo::Foo(), bar = 222 @ 0x23c5050
    Foo::~Foo(), bar = 200 @ 0x23c5040
    After reset(): use_count() = 1, sptr = 0x23c5050
    Leaving the scope...
    Foo::~Foo(), bar = 222 @ 0x23c5050
     
    3) multiple ownership
    Foo::Foo(), bar = 300 @ 0x23c5080
    Foo::bar = 300, use_count() = 3
    call sptr1.reset()...
    Foo::Foo(), bar = 333 @ 0x23c5050
    After reset():
    sptr1.use_count() = 1, sptr1 @ 0x23c5050
    sptr2.use_count() = 2, sptr2 @ 0x23c5080
    sptr3.use_count() = 2, sptr3 @ 0x23c5080
    Leaving the scope...
    Foo::~Foo(), bar = 300 @ 0x23c5080
    Foo::~Foo(), bar = 333 @ 0x23c5050
```

### Veja também

[ (constructor)](<#/doc/memory/shared_ptr/shared_ptr>) | constrói um novo `shared_ptr`
(função membro pública)