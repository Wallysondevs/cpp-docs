# std::shared_ptr&lt;T&gt;::use_count

long use_count() const noexcept;

  
Retorna o número de diferentes instâncias de `shared_ptr` (incluindo *this) que gerenciam o objeto atual. Se não houver objeto gerenciado, ​0​ é retornado. 

Em um ambiente multithread, `use_count` recupera atomicamente o número de instâncias (implementações típicas usam um carregamento com [memory_order_relaxed](<#/doc/atomic/memory_order>)). 

### Parâmetros

(nenhum) 

### Valor de retorno

O número de instâncias de [std::shared_ptr](<#/doc/memory/shared_ptr>) que gerenciam o objeto atual ou ​0​ se não houver objeto gerenciado. 

### Observações

Casos de uso comuns incluem 

  * comparação com ​0​. Se `use_count` retornar zero, o shared pointer está _vazio_ e não gerencia nenhum objeto (independentemente de seu ponteiro armazenado ser [`nullptr`](<#/doc/language/nullptr>) ou não). 
  * comparação com 1. Se `use_count` retornar 1, não há outros proprietários. A função membro [unique()](<#/doc/memory/shared_ptr/unique>), que foi descontinuada (desde C++17), é fornecida para este caso de uso.(até C++20)

Em um ambiente multithread 

O valor retornado por `use_count` deve ser considerado aproximado, pois o número de proprietários compartilhados pode mudar em outras threads entre a recuperação atômica e o uso significativo do valor. Quando `use_count` retorna 1, isso não implica que o objeto seja seguro para modificar, pois os acessos ao objeto gerenciado por antigos proprietários compartilhados podem não ter sido concluídos, e porque novos proprietários compartilhados podem ser introduzidos concorrentemente, como por [std::weak_ptr::lock](<#/doc/memory/weak_ptr/lock>). Somente quando `use_count` retorna 0 a contagem é precisa. 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <memory>
     
    void fun(std::shared_ptr<int> sp)
    {
        std::cout << "in fun(): sp.use_count() == " << sp.use_count()
                  << " (object @ " << sp << ")\n";
    }
     
    int main()
    {
        auto sp1 = std::make_shared<int>(5);
        std::cout << "in main(): sp1.use_count() == " << sp1.use_count()
                  << " (object @ " << sp1 << ")\n";
     
        fun(sp1);
    }
```

Saída possível: 
```
    in main(): sp1.use_count() == 1 (object @ 0x20eec30)
    in fun(): sp.use_count() == 2 (object @ 0x20eec30)
```

### Veja também

[ unique](<#/doc/memory/shared_ptr/unique>)(até C++20) | verifica se o objeto gerenciado é gerenciado apenas pelo objeto `shared_ptr` atual   
(função membro pública)  