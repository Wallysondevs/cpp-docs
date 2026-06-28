# std::atomic_ref&lt;T&gt;::compare_exchange_weak, std::atomic_ref&lt;T&gt;::compare_exchange_strong

bool compare_exchange_weak  
( value_type& expected, value_type desired,  
[std::memory_order](<#/doc/atomic/memory_order>) success,   
[std::memory_order](<#/doc/atomic/memory_order>) failure ) const noexcept; |  (1) | (constexpr desde C++26)  
bool compare_exchange_weak  
( value_type& expected, value_type desired,  
[std::memory_order](<#/doc/atomic/memory_order>) order =  
[std::memory_order_seq_cst](<#/doc/atomic/memory_order>) ) const noexcept; |  (2) | (constexpr desde C++26)  
bool compare_exchange_strong  
( value_type& expected, value_type desired,  
[std::memory_order](<#/doc/atomic/memory_order>) success,  
[std::memory_order](<#/doc/atomic/memory_order>) failure ) const noexcept; |  (3) | (constexpr desde C++26)  
bool compare_exchange_strong  
( value_type& expected, value_type desired,  
[std::memory_order](<#/doc/atomic/memory_order>) order =  
[std::memory_order_seq_cst](<#/doc/atomic/memory_order>) ) const noexcept; |  (4) | (constexpr desde C++26)  

  
Compara atomicamente a [representação de valor](<#/doc/language/objects>) do objeto referenciado com a de expected, e se forem iguais bit a bit, substitui o primeiro por desired (realiza uma operação de leitura-modificação-escrita). Caso contrário, carrega o valor real armazenado no objeto referenciado em expected (realiza uma operação de carregamento). 

1,3) Os modelos de memória para as operações de leitura-modificação-escrita e carregamento são success e failure, respectivamente.

2,4) order é usado para ambas as operações de leitura-modificação-escrita e carregamento, exceto que [std::memory_order_acquire](<#/doc/atomic/memory_order>) e [std::memory_order_relaxed](<#/doc/atomic/memory_order>) são usados para a operação de carregamento se order for [std::memory_order_acq_rel](<#/doc/atomic/memory_order>) ou [std::memory_order_release](<#/doc/atomic/memory_order>), respectivamente.

Essas sobrecargas participam da resolução de sobrecarga apenas se [std::is_const_v](<#/doc/types/is_const>)&lt;T&gt; for false. 

Se failure não for [std::memory_order_relaxed](<#/doc/atomic/memory_order>), [std::memory_order_consume](<#/doc/atomic/memory_order>), [std::memory_order_acquire](<#/doc/atomic/memory_order>) ou [std::memory_order_seq_cst](<#/doc/atomic/memory_order>), o comportamento é indefinido. 

### Parâmetros

expected  |  \-  |  referência ao valor esperado a ser encontrado no objeto referenciado pelo objeto `atomic_ref`   
---|---|---
desired  |  \-  |  o valor a ser armazenado no objeto referenciado se ele for conforme o esperado   
success  |  \-  |  a ordenação de sincronização de memória para a operação de leitura-modificação-escrita se a comparação for bem-sucedida   
failure  |  \-  |  a ordenação de sincronização de memória para a operação de carregamento se a comparação falhar   
order  |  \-  |  a ordenação de sincronização de memória para ambas as operações   
  
### Valor de retorno

true se o objeto referenciado foi alterado com sucesso, false caso contrário. 

### Observações

A comparação e a cópia são bit a bit (semelhante a [std::memcmp](<#/doc/string/byte/memcmp>) e [std::memcpy](<#/doc/string/byte/memcpy>)); nenhum construtor, operador de atribuição ou operador de comparação é usado. 

As formas fracas (1,2) das funções podem falhar espuriamente, ou seja, agir como se *this != expected mesmo que sejam iguais. Quando um compare-and-exchange está em um loop, a versão fraca proporcionará melhor desempenho em algumas plataformas. 

Quando um compare-and-exchange fraco exigiria um loop e um forte não, o forte é preferível, a menos que a representação do objeto de `value_type` possa incluir bits de armadilha (trap bits), ou ofereça múltiplas representações de objeto para o mesmo valor (por exemplo, NaN de ponto flutuante). Nesses casos, o compare-and-exchange fraco geralmente funciona porque converge rapidamente para alguma representação de objeto estável. 

Para uma union com bits que participam das representações de valor de alguns membros, mas não de outros, o compare-and-exchange pode sempre falhar porque tais bits de preenchimento (padding bits) têm valores indeterminados quando não participam da representação de valor do membro ativo. 

Bits de preenchimento (padding bits) que nunca participam da representação de valor de um objeto são ignorados. 

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 3508](<https://cplusplus.github.io/LWG/issue3508>)  
([P3323R1](<https://wg21.link/P3323R1>))  | C++20  | `compare_exchange_weak` e `compare_exchange_strong` eram sem sentido para const T | restrito a aceitar apenas T não-const  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   