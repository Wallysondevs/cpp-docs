# std::atomic_ref

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
template< class T >
struct atomic_ref;
```

O template de classe `std::atomic_ref` aplica operações atômicas ao objeto que ele referencia.

Durante a vida útil do objeto `std::atomic_ref`, o objeto que ele referencia é considerado um objeto atômico. Se uma thread escreve em um objeto atômico enquanto outra thread lê dele, o comportamento é bem definido (veja [modelo de memória](<#/doc/language/memory_model>) para detalhes sobre data races). Além disso, acessos a objetos atômicos podem estabelecer sincronização entre threads e ordenar acessos de memória não atômicos conforme especificado por [std::memory_order](<#/doc/atomic/memory_order>).

A vida útil de um objeto deve exceder a vida útil de todos os `std::atomic_ref`s que referenciam o objeto. Enquanto qualquer instância de `std::atomic_ref` referenciando um objeto existir, o objeto deve ser acessado exclusivamente através dessas instâncias de `std::atomic_ref`. Nenhum subobjeto de um objeto referenciado por um objeto `std::atomic_ref` pode ser referenciado concorrentemente por qualquer outro objeto `std::atomic_ref`.

Operações atômicas aplicadas a um objeto através de um `std::atomic_ref` são atômicas em relação a operações atômicas aplicadas através de qualquer outro `std::atomic_ref` que referencia o mesmo objeto.

Assim como [referências](<#/doc/language/reference>) na linguagem principal, a constness é superficial para `std::atomic_ref` - é possível modificar o valor referenciado através de um objeto `std::atomic_ref` const.

Se qualquer das seguintes condições for satisfeita, o programa é malformado:

  * [std::is_trivially_copyable_v](<#/doc/types/is_trivially_copyable>)&lt;T&gt; é falso.
  * [`is_always_lock_free`](<#/doc/atomic/atomic_ref/is_always_lock_free>) é falso e [std::is_volatile_v](<#/doc/types/is_volatile>)&lt;T&gt; é verdadeiro.

`std::atomic_ref` é [CopyConstructible](<#/doc/named_req/CopyConstructible>).

### Tipos aninhados

Tipo | Definição
---|---
`value_type` | [std::remove_cv_t](<#/doc/types/remove_cv>)&lt;T&gt;
`difference_type` |

  * `value_type`, se `T` for um tipo aritmético diferente de _cv_ bool.
  * Caso contrário, [std::ptrdiff_t](<#/doc/types/ptrdiff_t>), se `T` for um tipo ponteiro para objeto.
  * Caso contrário, não definido.

### Membros de dados

Membro | Descrição
---|---
T* `_ptr_` | o ponteiro para o objeto referenciado
(objeto membro apenas para exposição*)
[ is_always_lock_free](<#/doc/atomic/atomic_ref/is_always_lock_free>)[static] | indica que o tipo é sempre lock-free
(constante membro estática pública)
[ required_alignment](<#/doc/atomic/atomic_ref/required_alignment>)[static] | indica o alinhamento necessário de um objeto a ser referenciado por `atomic_ref`
(constante membro estática pública)

### Funções membro

[ (construtor)](<#/doc/atomic/atomic_ref/atomic_ref>) | constrói um objeto `atomic_ref`
(função membro pública)
[ operator=](<#/>) | armazena um valor no objeto referenciado por um objeto `atomic_ref`
(função membro pública)
[ is_lock_free](<#/doc/atomic/atomic_ref/is_lock_free>) | verifica se o objeto `atomic_ref` é lock-free
(função membro pública)
[ store](<#/doc/atomic/atomic_ref/store>) | substitui atomicamente o valor do objeto referenciado por um argumento não atômico
(função membro pública)
[ load](<#/doc/atomic/atomic_ref/load>) | obtém atomicamente o valor do objeto referenciado
(função membro pública)
[ operator value_type](<#/doc/atomic/atomic_ref/operator_T>) | carrega um valor do objeto referenciado
(função membro pública)
[ exchange](<#/doc/atomic/atomic_ref/exchange>) | substitui atomicamente o valor do objeto referenciado e obtém o valor mantido anteriormente
(função membro pública)
[ compare_exchange_weakcompare_exchange_strong](<#/doc/atomic/atomic_ref/compare_exchange>) | compara atomicamente o valor do objeto referenciado com um argumento não atômico e realiza uma troca atômica se forem iguais ou uma carga atômica se não forem
(função membro pública)
[ wait](<#/doc/atomic/atomic_ref/wait>) | bloqueia a thread até ser notificada e o valor atômico mudar
(função membro pública)
[ notify_one](<#/doc/atomic/atomic_ref/notify_one>) | notifica pelo menos uma thread esperando no objeto atômico
(função membro pública)
[ notify_all](<#/doc/atomic/atomic_ref/notify_all>) | notifica todas as threads bloqueadas esperando no objeto atômico
(função membro pública)
[ address](<#/doc/atomic/atomic_ref/address>)(C++26) | retorna o endereço do objeto
(função membro pública)

##### Fornecido apenas quando `T` é um tipo aritmético diferente de _cv_ bool ou um tipo ponteiro para objeto

[ fetch_add](<#/doc/atomic/atomic_ref/fetch_add>) | adiciona atomicamente o argumento ao valor armazenado no objeto referenciado e obtém o valor mantido anteriormente
(função membro pública)
[ fetch_sub](<#/doc/atomic/atomic_ref/fetch_sub>) | subtrai atomicamente o argumento do valor armazenado no objeto referenciado e obtém o valor mantido anteriormente
(função membro pública)
[ operator+=operator-=](<#/doc/atomic/atomic_ref/operator_arith2>) | adiciona ou subtrai atomicamente do valor referenciado
(função membro pública)

##### Fornecido apenas quando `T` é um tipo integral diferente de _cv_ bool ou um tipo ponteiro para objeto

[ fetch_max](<#/doc/atomic/atomic_ref/fetch_max>)(C++26) | realiza atomicamente [std::max](<#/doc/algorithm/max>) entre o argumento e o valor do objeto referenciado e obtém o valor mantido anteriormente
(função membro pública)
[ fetch_min](<#/doc/atomic/atomic_ref/fetch_min>)(C++26) | realiza atomicamente [std::min](<#/doc/algorithm/min>) entre o argumento e o valor do objeto referenciado e obtém o valor mantido anteriormente
(função membro pública)
[ operator++operator++(int)operator--operator--(int)](<#/doc/atomic/atomic_ref/operator_arith>) | incrementa ou decrementa atomicamente o objeto referenciado por um
(função membro pública)

##### Fornecido apenas quando `T` é um tipo integral diferente de _cv_ bool

[ fetch_and](<#/doc/atomic/atomic_ref/fetch_and>) | realiza atomicamente um AND bit a bit entre o argumento e o valor do objeto referenciado e obtém o valor mantido anteriormente
(função membro pública)
[ fetch_or](<#/doc/atomic/atomic_ref/fetch_or>) | realiza atomicamente um OR bit a bit entre o argumento e o valor do objeto referenciado e obtém o valor mantido anteriormente
(função membro pública)
[ fetch_xor](<#/doc/atomic/atomic_ref/fetch_xor>) | realiza atomicamente um XOR bit a bit entre o argumento e o valor do objeto referenciado e obtém o valor mantido anteriormente
(função membro pública)
[ operator&=operator|=operator^=](<#/doc/atomic/atomic_ref/operator_arith3>) | realiza atomicamente AND, OR, XOR bit a bit com o valor referenciado
(função membro pública)

### Especializações

O padrão especifica que `std::atomic_ref` possui as seguintes especializações:

```cpp
template<>
struct atomic_ref</*integral-type*/>;  // (1) (desde C++20)
template<>
struct atomic_ref</*floating-point-type*/>;  // (2) (desde C++20)
template< class /*pointer-type*/ >
requires /* veja abaixo */
struct atomic_ref</*pointer-type*/>;  // (3) (desde C++20)
```

1) /*integral-type*/ denota um tipo integral possivelmente cv-qualificado diferente de _cv_ bool.

2) /*floating-point-type*/ denota um tipo de ponto flutuante possivelmente cv-qualificado.

3) A especialização parcial é fornecida para tipos /*pointer-type*/ que são tipos ponteiro para objeto possivelmente cv-qualificados.

### Notas

Implementações podem mesclar as especializações especificadas. Por exemplo, o MSVC STL mescla todas elas no template primário.

Quando `T` é _cv_ void ou um tipo de função, std::atomic_ref<T*> (ou seja, std::atomic_ref<void*>, std::atomic_ref<int(*)()> etc.) não possui `difference_type` ou qualquer operação que exija aritmética de ponteiros ou comparação relacional (desde C++26).

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_atomic_ref`](<#/doc/feature_test>) | [`201806L`](<#/>) | (C++20) | `std::atomic_ref`
[`__cpp_lib_constexpr_atomic`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr [std::atomic](<#/doc/atomic/atomic>) e `std::atomic_ref`

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 3508](<https://cplusplus.github.io/LWG/issue3508>)
([P3323R1](<https://wg21.link/P3323R1>)) | C++20 | atomic_ref&lt;T&gt; tinha operações não implementáveis
se `T` for um tipo const ou tipo ponteiro para não-objeto | essas operações são restritas
ou não fornecidas para `T` inadequado

### Veja também

[ atomic](<#/doc/atomic/atomic>)(C++11) | template de classe atomic e especializações para bool, integral, ponto flutuante, (desde C++20) e tipos ponteiro
(template de classe)