# std::kill_dependency

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
template< class T >
T kill_dependency( T y ) noexcept;
```

Informa ao compilador que a árvore de dependência iniciada por uma operação de carregamento atômico [std::memory_order_consume](<#/doc/atomic/memory_order>) não se estende além do valor de retorno de `std::kill_dependency`; ou seja, o argumento não carrega uma dependência para o valor de retorno.

Isso pode ser usado para evitar barreiras [std::memory_order_acquire](<#/doc/atomic/memory_order>) desnecessárias quando a cadeia de dependência sai do escopo da função (e a função não possui o atributo `[[[carries_dependency](<#/doc/language/attributes/carries_dependency>)]]`).

### Parâmetros

- **y** — a expressão cujo valor de retorno deve ser removido de uma árvore de dependência

### Valor de retorno

Retorna y, não mais parte de uma árvore de dependência.

### Exemplos

##### file1.cpp:
```cpp
    struct Foo
    {
        int* a;
        int* b;
    };
    
    std::atomic<Foo*> foo_head[10];
    int foo_array[10][10];
    
    // a operação consume inicia uma cadeia de dependência, que escapa desta função
    [[carries_dependency]] Foo* f(int i)
    {
        return foo_head[i].load(memory_order_consume);
    }
    
    // a cadeia de dependência entra nesta função através do parâmetro direito e é
    // eliminada antes que a função termine (assim nenhuma operação acquire extra ocorre)
    int g(int* x, int* y [[carries_dependency]])
    {
        return std::kill_dependency(foo_array[*x][*y]);
    }
```

##### file2.cpp:
```cpp
    [[carries_dependency]] struct Foo* f(int i);
    int g(int* x, int* y [[carries_dependency]]);
    
    int c = 3;
    void h(int i)
    {
        Foo* p;
        p = f(i); // a cadeia de dependência iniciada dentro de f continua em p sem acquire indevido
        do_something_with(g(&c, p->a)); // p->b não é trazido do cache
        do_something_with(g(p->a, &c)); // o argumento esquerdo não possui o atributo carries_dependency
                                        // : uma barreira de acquire de memória pode ser emitida
                                        // p->b torna-se visível antes que g() seja chamada
    }
```

### Veja também

[ memory_order](<#/doc/atomic/memory_order>)(C++11) | define restrições de ordenação de memória para a operação atômica fornecida
---|---
(enum) |
[Documentação C](<#/>) para kill_dependency