# std::shared_ptr&lt;T&gt;::unique

bool unique() const noexcept; |  |  (obsoleto desde C++17)   
(removido em C++20)  

  
Verifica se *this é a única instância de `shared_ptr` gerenciando o objeto atual, ou seja, se use_count() == 1. 

### Parâmetros

(nenhum) 

### Valor de retorno

true se *this for a única instância de `shared_ptr` gerenciando o objeto atual, false caso contrário. 

### Observações

Esta função foi obsoleta em C++17 e removida em C++20 porque use_count() == 1 é sem sentido em um ambiente multithread (veja [Observações](<#/doc/memory/shared_ptr/use_count>) em [use_count](<#/doc/memory/shared_ptr/use_count>)). 

### Exemplo

Execute este código
```
    #include <iostream> 
    #include <memory> 
     
    int main() 
    { 
        auto sp1 = std::make_shared<int>(5);
        std::cout << std::boolalpha;
        std::cout << "sp1.unique() == " << sp1.unique() << '\n'; 
     
        std::shared_ptr<int> sp2 = sp1; 
        std::cout << "sp1.unique() == " << sp1.unique() << '\n'; 
    }
```

Saída: 
```
    sp1.unique() == true
    sp1.unique() == false
```

### Veja também

[ use_count](<#/doc/memory/shared_ptr/use_count>) |  retorna o número de objetos `shared_ptr` referenciando o mesmo objeto gerenciado   
(função membro pública)  