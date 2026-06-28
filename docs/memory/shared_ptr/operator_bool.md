# std::shared_ptr&lt;T&gt;::operator bool

explicit operator bool() const noexcept;

  
Verifica se *this armazena um ponteiro não nulo, ou seja, se get() != nullptr. 

### Parâmetros

(nenhum) 

### Valor de retorno

true se *this armazena um ponteiro, false caso contrário. 

### Observações

Um shared_ptr vazio (onde use_count() == 0) pode armazenar um ponteiro não nulo acessível por [get()](<#/doc/memory/shared_ptr/get>), por exemplo, se ele foi criado usando o construtor de aliasing. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <memory>
     
    void report(std::shared_ptr<int> ptr) 
    {
        if (ptr)
            std::cout << "*ptr=" << *ptr << "\n";
        else
            std::cout << "ptr is not a valid pointer.\n";
    }
     
    int main()
    {
        std::shared_ptr<int> ptr;
        report(ptr);
     
        ptr = std::make_shared<int>(7);
        report(ptr);
    }
```

Saída: 
```
    ptr is not a valid pointer.
    *ptr=7
```

### Veja também

[ get](<#/doc/memory/shared_ptr/get>) | retorna o ponteiro armazenado   
(função membro pública)  