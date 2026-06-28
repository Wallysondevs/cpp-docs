# std::shared_ptr&lt;T&gt;::operator*, std::shared_ptr&lt;T&gt;::operator-&gt;

```cpp
T& operator*() const noexcept;  // (1) (desde C++11)
T* operator->() const noexcept;  // (2) (desde C++11)
```

  
Desreferencia o ponteiro armazenado. O comportamento é indefinido se o ponteiro armazenado for nulo. 

### Parâmetros

(nenhum) 

### Valor de retorno

1) O resultado da desreferenciação do ponteiro armazenado, ou seja, *get().

2) O ponteiro armazenado, ou seja, get().

### Observações

Quando `T` é um tipo array ou (possivelmente cv-qualified)(desde C++17) `void`, é não especificado se a função (1) é declarada. Se for declarada, é não especificado qual é o seu tipo de retorno, exceto que a declaração (embora não necessariamente a definição) da função deve ser bem formada. Isso torna possível instanciar [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;void&gt;

Quando `T` é um tipo array, é não especificado se a função (2) é declarada. Se for declarada, é não especificado qual é o seu tipo de retorno, exceto que a declaração da função deve ser bem formada.  | (desde C++17)  
  
### Exemplo

Execute este código
```
    #include <iostream>
    #include <memory>
     
    struct Foo
    {
        Foo(int in) : a(in) {}
        void print() const
        {
            std::cout << "a = " << a << '\n';
        }
        int a;
    };
     
    int main()
    {
        auto ptr = std::make_shared<Foo>(10);
        ptr->print();
        (*ptr).print();
    }
```

Saída: 
```
    a = 10
    a = 10
```

### Veja também

[ get](<#/doc/memory/shared_ptr/get>) | retorna o ponteiro armazenado   
(função membro pública)  