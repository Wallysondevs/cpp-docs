# std::atomic&lt;std::weak_ptr&gt;

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
template< class T > struct std::atomic<std::weak_ptr<T>>;
```

A especialização parcial de template de [std::atomic](<#/doc/atomic/atomic>) para [std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;T&gt; permite aos usuários manipular objetos weak_ptr atomicamente.

Se múltiplas threads de execução acessarem o mesmo objeto [std::weak_ptr](<#/doc/memory/weak_ptr>) sem sincronização e qualquer um desses acessos usar uma função membro não-const de weak_ptr, então ocorrerá uma data race, a menos que todo esse acesso seja realizado através de uma instância de [std::atomic](<#/doc/atomic/atomic>)<[std::weak_ptr](<#/doc/memory/weak_ptr>)>.

Incrementos associados de `use_count` são garantidos como parte da operação atômica. Decrementos associados de `use_count` são sequenciados após a operação atômica, mas não são exigidos como parte dela, exceto pela mudança de `use_count` ao sobrescrever `expected` em um CAS falho. Qualquer exclusão e desalocação associadas são sequenciadas após a etapa de atualização atômica e não fazem parte da operação atômica.

Note que o bloco de controle usado por [std::weak_ptr](<#/doc/memory/weak_ptr>) e [std::shared_ptr](<#/doc/memory/shared_ptr>) é thread-safe: diferentes objetos [std::weak_ptr](<#/doc/memory/weak_ptr>) não-atômicos podem ser acessados usando operações mutáveis, como operator= ou `reset`, simultaneamente por múltiplas threads, mesmo quando essas instâncias são cópias ou de outra forma compartilham o mesmo bloco de controle internamente.

O tipo `T` pode ser um tipo incompleto.

### Tipos de membros

Tipo de membro | Definição
---|---
`value_type` | [std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;T&gt;

### Funções membro

Todas as funções [std::atomic](<#/doc/atomic/atomic>) não especializadas também são fornecidas por esta especialização, e nenhuma função membro adicional.

## atomic<weak_ptr&lt;T&gt;>::atomic

```cpp
constexpr atomic() noexcept = default;  // (1)
atomic(std::weak_ptr<T> desired) noexcept;  // (2)
atomic(const atomic&) = delete;  // (3)
```

1) Inicializa o `weak_ptr<T>` subjacente com um valor construído por padrão.

2) Inicializa o `weak_ptr<T>` subjacente com uma cópia de `desired`. Assim como em qualquer tipo [std::atomic](<#/doc/atomic/atomic>), a inicialização não é uma operação atômica.

3) Tipos atômicos não são construtíveis por cópia/movimentação.

## atomic<weak_ptr&lt;T&gt;>::operator=

```cpp
void operator=(const atomic&) = delete;  // (1)
void operator=(std::weak_ptr<T> desired) noexcept;  // (2)
```

1) Tipos atômicos não são atribuíveis por cópia/movimentação.

2) Atribuição de valor, equivalente a store(desired).

## atomic<weak_ptr&lt;T&gt;>::is_lock_free

bool is_lock_free() const noexcept;

Retorna true se as operações atômicas em todos os objetos deste tipo são lock-free, false caso contrário.

## atomic<weak_ptr&lt;T&gt;>::store

void store([std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;T&gt; desired,
[std::memory_order](<#/doc/atomic/memory_order>) order = [std::memory_order_seq_cst](<#/doc/atomic/memory_order>)) noexcept;

Substitui atomicamente o valor de *this pelo valor de `desired` como se por p.swap(desired) onde p é o [std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;T&gt; subjacente. A memória é ordenada de acordo com `order`. O comportamento é indefinido se `order` for [std::memory_order_consume](<#/doc/atomic/memory_order>), [std::memory_order_acquire](<#/doc/atomic/memory_order>), ou [std::memory_order_acq_rel](<#/doc/atomic/memory_order>).

## atomic<weak_ptr&lt;T&gt;>::load

[std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;T&gt; load([std::memory_order](<#/doc/atomic/memory_order>) order = [std::memory_order_seq_cst](<#/doc/atomic/memory_order>)) const noexcept;

Retorna atomicamente uma cópia do [std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;T&gt; subjacente. A memória é ordenada de acordo com `order`. O comportamento é indefinido se `order` for [std::memory_order_release](<#/doc/atomic/memory_order>) ou [std::memory_order_acq_rel](<#/doc/atomic/memory_order>).

## atomic<weak_ptr&lt;T&gt;>::operator std::weak_ptr&lt;T&gt;

operator [std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;T&gt;() const noexcept;

Equivalente a return load();.

## atomic<weak_ptr&lt;T&gt;>::exchange

[std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;T&gt; exchange([std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;T&gt; desired,
[std::memory_order](<#/doc/atomic/memory_order>) order = [std::memory_order_seq_cst](<#/doc/atomic/memory_order>)) noexcept;

Substitui atomicamente o [std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;T&gt; subjacente por `desired` como se por p.swap(desired) onde p é o [std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;T&gt; subjacente, e retorna uma cópia do valor que p tinha imediatamente antes da troca. A memória é ordenada de acordo com `order`. Esta é uma operação atômica de leitura-modificação-escrita.

## atomic<weak_ptr&lt;T&gt;>::compare_exchange_weak, compare_exchange_strong

```cpp
bool compare_exchange_strong(std::weak_ptr<T>& expected, std::weak_ptr<T> desired,
std::memory_order success, std::memory_order failure) noexcept;  // (1)
bool compare_exchange_weak(std::weak_ptr<T>& expected, std::weak_ptr<T> desired,
std::memory_order success, std::memory_order failure) noexcept;  // (2)
bool compare_exchange_strong(std::weak_ptr<T>& expected, std::weak_ptr<T> desired,
std::memory_order order = std::memory_order_seq_cst) noexcept;  // (3)
bool compare_exchange_weak(std::weak_ptr<T>& expected, std::weak_ptr<T> desired,
std::memory_order order = std::memory_order_seq_cst) noexcept;  // (4)
```

1) Se o [std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;T&gt; subjacente armazena o mesmo valor de ponteiro que `expected` e compartilha a propriedade com ele, ou se ambos, o subjacente e `expected`, estão vazios, atribui de `desired` para o [std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;T&gt; subjacente, retorna true, e ordena a memória de acordo com `success`, caso contrário, atribui do [std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;T&gt; subjacente para `expected`, retorna false, e ordena a memória de acordo com `failure`. O comportamento é indefinido se `failure` for [std::memory_order_release](<#/doc/atomic/memory_order>) ou [std::memory_order_acq_rel](<#/doc/atomic/memory_order>). Em caso de sucesso, a operação é uma operação atômica de leitura-modificação-escrita em *this e `expected` não é acessado após a atualização atômica. Em caso de falha, a operação é uma operação de carregamento atômico em *this e `expected` é atualizado com o valor existente lido do objeto atômico. Esta atualização do use_count de `expected` faz parte desta operação atômica, embora a própria escrita (e qualquer desalocação/destruição subsequente) não seja exigida como parte dela.

2) O mesmo que (1), mas também pode falhar de forma espúria.

3) Equivalente a: return compare_exchange_strong(expected, desired, order, fail_order);, onde `fail_order` é o mesmo que `order`, exceto que [std::memory_order_acq_rel](<#/doc/atomic/memory_order>) é substituído por [std::memory_order_acquire](<#/doc/atomic/memory_order>) e [std::memory_order_release](<#/doc/atomic/memory_order>) é substituído por [std::memory_order_relaxed](<#/doc/atomic/memory_order>).

4) Equivalente a: return compare_exchange_weak(expected, desired, order, fail_order);, onde `fail_order` é o mesmo que `order`, exceto que [std::memory_order_acq_rel](<#/doc/atomic/memory_order>) é substituído por [std::memory_order_acquire](<#/doc/atomic/memory_order>) e [std::memory_order_release](<#/doc/atomic/memory_order>) é substituído por [std::memory_order_relaxed](<#/doc/atomic/memory_order>).

## atomic<weak_ptr&lt;T&gt;>::wait

void wait([std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;T&gt; old
[std::memory_order](<#/doc/atomic/memory_order>) order = [std::memory_order_seq_cst](<#/doc/atomic/memory_order>)) const noexcept;

Executa uma operação de espera atômica.

Compara load(order) com `old` e, se forem equivalentes, bloqueia até que *this seja notificado por `notify_one()` ou `notify_all()`. Isso é repetido até que load(order) mude. Esta função é garantida para retornar somente se o valor tiver mudado, mesmo que a implementação subjacente desbloqueie de forma espúria.

A memória é ordenada de acordo com `order`. O comportamento é indefinido se `order` for [std::memory_order_release](<#/doc/atomic/memory_order>) ou [std::memory_order_acq_rel](<#/doc/atomic/memory_order>).

Notas: dois [std::weak_ptr](<#/doc/memory/weak_ptr>)s são equivalentes se armazenam o mesmo ponteiro e ou compartilham a propriedade ou ambos estão vazios.

## atomic<weak_ptr&lt;T&gt;>::notify_one

void notify_one() noexcept;

Executa uma operação de notificação atômica.

Se houver uma thread bloqueada em operações de espera atômicas (ou seja, `wait()`) em *this, então desbloqueia pelo menos uma dessas threads; caso contrário, não faz nada.

## atomic<weak_ptr&lt;T&gt;>::notify_all

void notify_all() noexcept;

Executa uma operação de notificação atômica.

Desbloqueia todas as threads bloqueadas em operações de espera atômicas (ou seja, `wait()`) em *this, se houver alguma; caso contrário, não faz nada.

### Constantes de membro

A única constante de membro padrão [std::atomic](<#/doc/atomic/atomic>) `is_always_lock_free` também é fornecida por esta especialização.

## atomic<weak_ptr&lt;T&gt;>::is_always_lock_free

static constexpr bool is_always_lock_free = /*implementation-defined*/;

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Veja também

[ atomic](<#/doc/atomic/atomic>)(C++11) | modelo de classe atômica e especializações para bool, integral, ponto flutuante, (desde C++20) e tipos de ponteiro
(modelo de classe)