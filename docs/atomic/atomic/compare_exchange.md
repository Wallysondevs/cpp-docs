# std::atomic&lt;T&gt;::compare_exchange_weak, std::atomic&lt;T&gt;::compare_exchange_strong

```cpp
bool compare_exchange_weak( T& expected, T desired,
std::memory_order success,
std::memory_order failure ) noexcept;  // (1) (desde C++11)
bool compare_exchange_weak( T& expected, T desired,
std::memory_order success,
std::memory_order failure ) volatile noexcept;  // (2) (desde C++11)
bool compare_exchange_weak( T& expected, T desired,
std::memory_order order =
std::memory_order_seq_cst ) noexcept;  // (3) (desde C++11)
bool compare_exchange_weak( T& expected, T desired,
std::memory_order order =
std::memory_order_seq_cst ) volatile noexcept;  // (4) (desde C++11)
bool compare_exchange_strong( T& expected, T desired,
std::memory_order success,
std::memory_order failure ) noexcept;  // (5) (desde C++11)
bool compare_exchange_strong( T& expected, T desired,
std::memory_order success,
std::memory_order failure ) volatile noexcept;  // (6) (desde C++11)
bool compare_exchange_strong( T& expected, T desired,
std::memory_order order =
std::memory_order_seq_cst ) noexcept;  // (7) (desde C++11)
bool compare_exchange_strong
( T& expected, T desired,
std::memory_order order = std::memory_order_seq_cst ) volatile noexcept;  // (8) (desde C++11)
```

  
Compara atomicamente a [representação do objeto](<#/doc/language/objects>)(até C++20)[representação do valor](<#/doc/language/objects>)(desde C++20) de `*this` com a de `expected`. Se forem bit a bit iguais, substitui a primeira por `desired` (realiza uma operação de leitura-modificação-escrita). Caso contrário, carrega o valor real armazenado em `*this` para `expected` (realiza uma operação de carregamento).

Sobrecargas | Modelo de memória para
---|---
operação de leitura-modificação-escrita | operação de carregamento   
(1,2,5,6) | success | failure  
(3,4,7,8) | order | 

  * [std::memory_order_acquire](<#/doc/atomic/memory_order>) se `order` for [std::memory_order_acq_rel](<#/doc/atomic/memory_order>)
  * [std::memory_order_relaxed](<#/doc/atomic/memory_order>) se `order` for [std::memory_order_release](<#/doc/atomic/memory_order>)
  * caso contrário, `order`

  
  
Se `failure` for mais forte que `success` ou (até C++17) for um de [std::memory_order_release](<#/doc/atomic/memory_order>) e [std::memory_order_acq_rel](<#/doc/atomic/memory_order>), o comportamento é indefinido.

É descontinuado se [std::atomic](<#/doc/atomic/atomic>)&lt;T&gt;::is_always_lock_free for `false` e qualquer sobrecarga `volatile` participar da resolução de sobrecarga. | (desde C++20)  
  
### Parâmetros

- **expected** — referência para o valor esperado a ser encontrado no objeto atômico
- **desired** — o valor a ser armazenado no objeto atômico se ele for o esperado
- **success** — a ordenação de sincronização de memória para a operação de leitura-modificação-escrita se a comparação for bem-sucedida
- **failure** — a ordenação de sincronização de memória para a operação de carregamento se a comparação falhar
- **order** — a ordenação de sincronização de memória para ambas as operações
  
### Valor de retorno

`true` se o valor atômico subjacente foi alterado com sucesso, `false` caso contrário.

### Notas

A comparação e a cópia são bit a bit (semelhante a [std::memcmp](<#/doc/string/byte/memcmp>) e [std::memcpy](<#/doc/string/byte/memcpy>)); nenhum construtor, operador de atribuição ou operador de comparação é usado.

`compare_exchange_weak` pode falhar espuriamente, ou seja, age como se `*this != expected` mesmo que sejam iguais. Quando uma operação de compare-and-exchange está em um loop, `compare_exchange_weak` proporcionará melhor desempenho em algumas plataformas.

Quando `compare_exchange_weak` exigiria um loop e `compare_exchange_strong` não, `compare_exchange_strong` é preferível, a menos que a representação do objeto de `T` possa incluir bits de preenchimento (padding bits), (até C++20) bits de armadilha (trap bits), ou ofereça múltiplas representações de objeto para o mesmo valor (por exemplo, NaN de ponto flutuante). Nesses casos, `compare_exchange_weak` geralmente funciona porque converge rapidamente para alguma representação de objeto estável.

Para uma union com bits que participam das representações de valor de alguns membros, mas não de outros, o compare-and-exchange pode sempre falhar porque esses bits de preenchimento têm valores indeterminados quando não participam da representação de valor do membro ativo.

Bits de preenchimento que nunca participam da representação de valor de um objeto são ignorados. | (desde C++20)  
  
### Exemplo

Operações de compare-and-exchange são frequentemente usadas como blocos de construção básicos de estruturas de dados [lock-free](<https://en.wikipedia.org/wiki/Non-blocking_algorithm> "enwiki:Non-blocking algorithm").

Run this code
```
    #include <atomic>
     
    template<typename T>
    struct node
    {
        T data;
        node* next;
        node(const T& data) : data(data), next(nullptr) {}
    };
     
    template<typename T>
    class stack
    {
        std::atomic<node<T>*> head;
    public:
        void push(const T& data)
        {
            node<T>* new_node = new node<T>(data);
     
            // coloca o valor atual de head em new_node->next
            new_node->next = head.load(std::memory_order_relaxed);
     
            // agora torna new_node o novo head, mas se head
            // não for mais o que está armazenado em new_node->next
            // (alguma outra thread deve ter inserido um nó agora mesmo)
            // então coloca esse novo head em new_node->next e tenta novamente
            while (!head.compare_exchange_weak(new_node->next, new_node,
                                               std::memory_order_release,
                                               std::memory_order_relaxed))
                ; // o corpo do loop está vazio
     
    // Nota: o uso acima não é thread-safe em pelo menos 
    // GCC antes de 4.8.3 (bug 60272), clang antes de 2014-05-05 (bug 18899)
    // MSVC antes de 2014-03-17 (bug 819819). A seguir está uma solução alternativa:
    //      node<T>* old_head = head.load(std::memory_order_relaxed);
    //      do
    //      {
    //          new_node->next = old_head;
    //      }
    //      while (!head.compare_exchange_weak(old_head, new_node,
    //                                         std::memory_order_release,
    //                                         std::memory_order_relaxed));
        }
    };
     
    int main()
    {
        stack<int> s;
        s.push(1);
        s.push(2);
        s.push(3);
    }
```

Demonstra como `std::compare_exchange_strong` altera o valor da variável atômica ou a variável usada para comparação.

| Esta seção está incompleta  
Razão: um uso mais prático do CAS forte seria bom, como onde Concurrency in Action o utiliza   
  
Run this code
```
    #include <atomic>
    #include <iostream>
     
    std::atomic<int> ai;
     
    int tst_val = 4;
    int new_val = 5;
    bool exchanged = false;
     
    void valsout()
    {
        std::cout << "ai = " << ai
    	      << "  tst_val = " << tst_val
    	      << "  new_val = " << new_val
    	      << "  exchanged = " << std::boolalpha << exchanged
    	      << '\n';
    }
     
    int main()
    {
        ai = 3;
        valsout();
     
        // tst_val != ai ==> tst_val é modificado
        exchanged = ai.compare_exchange_strong(tst_val, new_val);
        valsout();
     
        // tst_val == ai ==> ai é modificado
        exchanged = ai.compare_exchange_strong(tst_val, new_val);
        valsout();
    }
```

Output: 
```
    ai = 3  tst_val = 4  new_val = 5  exchanged = false
    ai = 3  tst_val = 3  new_val = 5  exchanged = false
    ai = 5  tst_val = 3  new_val = 5  exchanged = true
```

### Ver também

[ atomic_compare_exchange_weakatomic_compare_exchange_weak_explicitatomic_compare_exchange_strongatomic_compare_exchange_strong_explicit](<#/doc/atomic/atomic_compare_exchange>)(desde C++11)(desde C++11)(desde C++11)(desde C++11) | compara atomicamente o valor do objeto atômico com um argumento não atômico e realiza uma troca atômica se iguais ou um carregamento atômico se não   
(modelo de função)  