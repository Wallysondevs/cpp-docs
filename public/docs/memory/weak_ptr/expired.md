# std::weak_ptr&lt;T&gt;::expired

```cpp
bool expired() const noexcept;  // (desde C++11)
```

  
Equivalente a use_count() == 0. O destrutor para o objeto gerenciado pode ainda não ter sido chamado, mas a destruição deste objeto é iminente (ou pode já ter ocorrido). 

### Parâmetros

(nenhum) 

### Valor de retorno

true se o objeto gerenciado já foi excluído, false caso contrário. 

### Observações

Se o objeto gerenciado é compartilhado entre threads, é significativo apenas quando `expired()` retorna true. 

### Exemplo

Demonstra como `expired` é usado para verificar a validade do ponteiro.

Run this code
```
    #include <iostream>
    #include <memory>
     
    std::weak_ptr<int> gw;
     
    void f()
    {
        if (!gw.expired())
    	std::cout << "gw is valid\n";
        else
            std::cout << "gw is expired\n";
    }
     
    int main()
    {
        {
            auto sp = std::make_shared<int>(42);
    	gw = sp;
     
    	f();
        }
     
        f();
    }
```

Saída: 
```
    gw is valid
    gw is expired
```

### Veja também

[ lock](<#/doc/memory/weak_ptr/lock>) |  cria um `shared_ptr` que gerencia o objeto referenciado   
(função membro pública)  
[ use_count](<#/doc/memory/weak_ptr/use_count>) |  retorna o número de objetos `shared_ptr` que gerenciam o objeto   
(função membro pública)