# std::atomic_ref&lt;T&gt;::notify_one

void notify_one() const noexcept; |  | (constexpr desde C++26)  

  
Executa operações atômicas de notificação.

Se houver uma thread bloqueada em uma operação de espera atômica (ou seja, [`wait()`](<#/doc/atomic/atomic_ref/wait>)) em *`_[ptr](<#/doc/atomic/atomic_ref>)_` , então desbloqueia _pelo menos_ uma dessas threads; caso contrário, não faz nada. Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_const_v](<#/doc/types/is_const>)&lt;T&gt; for false.

### Notas

Esta forma de detecção de mudança é frequentemente mais eficiente do que polling simples ou spinlocks puros.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
[LWG 3508](<https://cplusplus.github.io/LWG/issue3508>)  
([P3323R1](<https://wg21.link/P3323R1>))  | C++20  | `notify_one` era sem sentido para const T | restrito a aceitar apenas `T` não-const  
  
### Ver também

[ wait](<#/doc/atomic/atomic_ref/wait>) | bloqueia a thread até ser notificada e o valor atômico mudar   
(função membro pública)  
[ atomic_waitatomic_wait_explicit](<#/doc/atomic/atomic_wait>)(C++20)(C++20) | bloqueia a thread até ser notificada e o valor atômico mudar   
(modelo de função)  
[ atomic_notify_one](<#/doc/atomic/atomic_notify_one>)(C++20) | notifica uma thread bloqueada em atomic_wait   
(modelo de função)