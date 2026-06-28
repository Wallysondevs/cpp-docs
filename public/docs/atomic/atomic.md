# std::atomic

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
template< class T >
struct atomic;
template< class U >
struct atomic<U*>;
Definido no cabeçalho `<memory>`
template< class U >
struct atomic<std::shared_ptr<U>>;
template< class U >
struct atomic<std::weak_ptr<U>>;
Definido no cabeçalho `<stdatomic.h>`
#define _Atomic(T) /* see below */
```

  
Cada instanciação e especialização completa do template `std::atomic` define um tipo atômico. Se uma thread escreve em um objeto atômico enquanto outra thread lê dele, o comportamento é bem definido (veja [modelo de memória](<#/doc/language/memory_model>) para detalhes sobre data races). 

Além disso, acessos a objetos atômicos podem estabelecer sincronização entre threads e ordenar acessos de memória não atômicos conforme especificado por [std::memory_order](<#/doc/atomic/memory_order>). 

`std::atomic` não é copiável nem movível. 

A macro de compatibilidade `_Atomic` é fornecida em [`<stdatomic.h>`](<#/doc/header/stdatomic.h>) de modo que `_Atomic(T)` é idêntico a `std::atomic<T>` enquanto ambos são bem formados. Não é especificado se alguma declaração no namespace `std` está disponível quando [`<stdatomic.h>`](<#/doc/header/stdatomic.h>) é incluído.  | (desde C++23)  
  
### Especializações

#### Template primário

O template primário `std::atomic` pode ser instanciado com qualquer tipo [TriviallyCopyable](<#/doc/named_req/TriviallyCopyable>) `T` que satisfaça tanto [CopyConstructible](<#/doc/named_req/CopyConstructible>) quanto [CopyAssignable](<#/doc/named_req/CopyAssignable>). O programa é malformado se qualquer um dos seguintes valores for falso: 

  * [std::is_trivially_copyable](<#/doc/types/is_trivially_copyable>)&lt;T&gt;::value
  * [std::is_copy_constructible](<#/doc/types/is_copy_constructible>)&lt;T&gt;::value
  * [std::is_move_constructible](<#/doc/types/is_move_constructible>)&lt;T&gt;::value
  * [std::is_copy_assignable](<#/doc/types/is_copy_assignable>)&lt;T&gt;::value
  * [std::is_move_assignable](<#/doc/types/is_move_assignable>)&lt;T&gt;::value
  * [std::is_same](<#/doc/types/is_same>)<T, typename [std::remove_cv](<#/doc/types/remove_cv>)&lt;T&gt;::type>::value

```cpp
    struct Counters { int a; int b; }; // user-defined trivially-copyable type
    std::atomic<Counters> cnt;         // specialization for the user-defined type
```

std::atomic&lt;bool&gt; usa o template primário. É garantido que seja uma [struct de layout padrão](<#/doc/language/classes>) e tenha um [destrutor trivial](<#/doc/language/destructor>). 

#### Especializações parciais

A standard library fornece especializações parciais do template `std::atomic` para os seguintes tipos com propriedades adicionais que o template primário não possui: 

2) Especializações parciais `std::atomic<U*>` para todos os tipos de ponteiro. Essas especializações possuem layout padrão, construtores padrão triviais,(até C++20) e destrutores triviais. Além das operações fornecidas para todos os tipos atômicos, essas especializações também suportam operações aritméticas atômicas apropriadas para tipos de ponteiro, como [`fetch_add`](<#/doc/atomic/atomic/fetch_add>), [`fetch_sub`](<#/doc/atomic/atomic/fetch_sub>).

3,4) Especializações parciais std::atomic<[std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;U&gt;> e std::atomic<[std::weak_ptr](<#/doc/memory/weak_ptr>)&lt;U&gt;> são fornecidas para [std::shared_ptr](<#/doc/memory/shared_ptr>) e [std::weak_ptr](<#/doc/memory/weak_ptr>). Veja [`std::atomic<std::shared_ptr>`](<#/doc/memory/shared_ptr/atomic2>) e [`std::atomic<std::weak_ptr>`](<#/doc/memory/weak_ptr/atomic2>) para detalhes.  | (desde C++20)  
  
#### Especializações para tipos integrais

Quando instanciado com um dos seguintes tipos integrais, `std::atomic` fornece operações atômicas adicionais apropriadas para tipos integrais, como [`fetch_add`](<#/doc/atomic/atomic/fetch_add>), [`fetch_sub`](<#/doc/atomic/atomic/fetch_sub>), [`fetch_and`](<#/doc/atomic/atomic/fetch_and>), [`fetch_or`](<#/doc/atomic/atomic/fetch_or>), [`fetch_xor`](<#/doc/atomic/atomic/fetch_xor>): 

    

  * Os tipos de caractere char, char8_t(desde C++20), char16_t, char32_t e wchar_t; 
  * Os tipos inteiros com sinal padrão: signed char, short, int, long e long long; 
  * Os tipos inteiros sem sinal padrão: unsigned char, unsigned short, unsigned int, unsigned long e unsigned long long; 
  * Quaisquer tipos integrais adicionais necessários pelos typedefs no cabeçalho [`<cstdint>`](<#/doc/header/cstdint>). 

Além disso, a especialização `std::atomic<_Integral_ >` resultante possui layout padrão, um construtor padrão trivial,(até C++20) e um destrutor trivial. A aritmética de inteiros com sinal é definida para usar complemento de dois; não há resultados indefinidos. 

#### Especializações para tipos de ponto flutuante

Quando instanciado com um dos tipos de ponto flutuante não cv-qualificados (float, double, long double e [tipos de ponto flutuante estendidos](<#/doc/language/types>) não cv-qualificados(desde C++23)), `std::atomic` fornece operações atômicas adicionais apropriadas para tipos de ponto flutuante, como [`fetch_add`](<#/doc/atomic/atomic/fetch_add>) e [`fetch_sub`](<#/doc/atomic/atomic/fetch_sub>). Além disso, a especialização `std::atomic<_Floating_ >` resultante possui layout padrão e um destrutor trivial. Nenhuma operação resulta em comportamento indefinido, mesmo que o resultado não seja representável no tipo de ponto flutuante. O [ambiente de ponto flutuante](<#/doc/numeric/fenv>) em vigor pode ser diferente do ambiente de ponto flutuante da thread chamadora.  | (desde C++20)  
  
### Tipos de membro

Tipo  |  Definição   
---|---
`value_type` |  `T` (independentemente de ser especializado ou não)  
`difference_type`[1](<#/doc/atomic/atomic>) |  |  `value_type` (apenas para especializações `atomic<_Integral_ >` e `atomic<_Floating_ >`(desde C++20))  
|   
[std::ptrdiff_t](<#/doc/types/ptrdiff_t>) (apenas para especializações `std::atomic<U*>`) |   
  
  1. [↑](<#/doc/atomic/atomic>) `difference_type` não é definido no template primário `std::atomic` ou nas especializações parciais para [std::shared_ptr](<#/doc/memory/shared_ptr>) e [std::weak_ptr](<#/doc/memory/weak_ptr>).

### Funções membro

[ (construtor)](<#/doc/atomic/atomic/atomic>) |  constrói um objeto atômico   
(função membro pública)  
[ operator=](<#/>) |  armazena um valor em um objeto atômico   
(função membro pública)  
[ is_lock_free](<#/doc/atomic/atomic/is_lock_free>) |  verifica se o objeto atômico é lock-free   
(função membro pública)  
[ store](<#/doc/atomic/atomic/store>) |  substitui atomicamente o valor do objeto atômico por um argumento não atômico   
(função membro pública)  
[ load](<#/doc/atomic/atomic/load>) |  obtém atomicamente o valor do objeto atômico   
(função membro pública)  
[ operator T](<#/doc/atomic/atomic/operator_T>) |  carrega um valor de um objeto atômico   
(função membro pública)  
[ exchange](<#/doc/atomic/atomic/exchange>) |  substitui atomicamente o valor do objeto atômico e obtém o valor mantido anteriormente   
(função membro pública)  
[ compare_exchange_weakcompare_exchange_strong](<#/doc/atomic/atomic/compare_exchange>) |  compara atomicamente o valor do objeto atômico com um argumento não atômico e realiza uma troca atômica se iguais ou uma carga atômica se não   
(função membro pública)  
[ wait](<#/doc/atomic/atomic/wait>)(C++20) |  bloqueia a thread até ser notificada e o valor atômico mudar   
(função membro pública)  
[ notify_one](<#/doc/atomic/atomic/notify_one>)(C++20) |  notifica pelo menos uma thread esperando no objeto atômico   
(função membro pública)  
[ notify_all](<#/doc/atomic/atomic/notify_all>)(C++20) |  notifica todas as threads bloqueadas esperando no objeto atômico   
(função membro pública)  
  
### Constantes  
  
[ is_always_lock_free](<#/doc/atomic/atomic/is_always_lock_free>)[static] (C++17) |  indica que o tipo é sempre lock-free   
(constante membro estática pública)  
  
### Funções membro especializadas

##### Especializadas para tipos integrais, de ponto flutuante(desde C++20) e de ponteiro   
  
---  
[ fetch_add](<#/doc/atomic/atomic/fetch_add>) |  adiciona atomicamente o argumento ao valor armazenado no objeto atômico e obtém o valor mantido anteriormente   
(função membro pública)  
[ fetch_sub](<#/doc/atomic/atomic/fetch_sub>) |  subtrai atomicamente o argumento do valor armazenado no objeto atômico e obtém o valor mantido anteriormente   
(função membro pública)  
[ operator+=operator-=](<#/doc/atomic/atomic/operator_arith2>) |  adiciona ou subtrai do valor atômico   
(função membro pública)  
  
##### Especializadas apenas para tipos integrais e de ponteiro   
  
[ fetch_max](<#/doc/atomic/atomic/fetch_max>)(C++26) |  realiza atomicamente [std::max](<#/doc/algorithm/max>) entre o argumento e o valor do objeto atômico e obtém o valor mantido anteriormente   
(função membro pública)  
[ fetch_min](<#/doc/atomic/atomic/fetch_min>)(C++26) |  realiza atomicamente [std::min](<#/doc/algorithm/min>) entre o argumento e o valor do objeto atômico e obtém o valor mantido anteriormente   
(função membro pública)  
[ operator++operator++(int)operator--operator--(int)](<#/doc/atomic/atomic/operator_arith>) |  incrementa ou decrementa o valor atômico em um   
(função membro pública)  
  
##### Especializadas apenas para tipos integrais   
  
[ fetch_and](<#/doc/atomic/atomic/fetch_and>) |  realiza atomicamente um AND bit a bit entre o argumento e o valor do objeto atômico e obtém o valor mantido anteriormente   
(função membro pública)  
[ fetch_or](<#/doc/atomic/atomic/fetch_or>) |  realiza atomicamente um OR bit a bit entre o argumento e o valor do objeto atômico e obtém o valor mantido anteriormente   
(função membro pública)  
[ fetch_xor](<#/doc/atomic/atomic/fetch_xor>) |  realiza atomicamente um XOR bit a bit entre o argumento e o valor do objeto atômico e obtém o valor mantido anteriormente   
(função membro pública)  
[ operator&=operator|=operator^=](<#/doc/atomic/atomic/operator_arith3>) |  realiza AND, OR, XOR bit a bit com o valor atômico   
(função membro pública)  
  
### Aliases de tipo

Aliases de tipo são fornecidos para bool e todos os tipos integrais listados acima, como segue: 

##### Aliases para todos `std::atomic<Integral>`  
  
---  
** atomic_bool**(C++11) |  std::atomic&lt;bool&gt;   
(typedef)  
** atomic_char**(C++11) |  std::atomic&lt;char&gt;   
(typedef)  
** atomic_schar**(C++11) |  std::atomic&lt;signed char&gt;   
(typedef)  
** atomic_uchar**(C++11) |  std::atomic&lt;unsigned char&gt;   
(typedef)  
** atomic_short**(C++11) |  std::atomic&lt;short&gt;   
(typedef)  
** atomic_ushort**(C++11) |  std::atomic&lt;unsigned short&gt;   
(typedef)  
** atomic_int**(C++11) |  std::atomic&lt;int&gt;   
(typedef)  
** atomic_uint**(C++11) |  std::atomic&lt;unsigned int&gt;   
(typedef)  
** atomic_long**(C++11) |  std::atomic&lt;long&gt;   
(typedef)  
** atomic_ulong**(C++11) |  std::atomic&lt;unsigned long&gt;   
(typedef)  
** atomic_llong**(C++11) |  std::atomic&lt;long long&gt;   
(typedef)  
** atomic_ullong**(C++11) |  std::atomic&lt;unsigned long long&gt;   
(typedef)  
** atomic_char8_t**(C++20) |  std::atomic<char8_t>   
(typedef)  
** atomic_char16_t**(C++11) |  std::atomic<char16_t>   
(typedef)  
** atomic_char32_t**(C++11) |  std::atomic<char32_t>   
(typedef)  
** atomic_wchar_t**(C++11) |  std::atomic<wchar_t>   
(typedef)  
** atomic_int8_t**(C++11)(opcional) |  std::atomic<[std::int8_t](<#/doc/types/integer>)>   
(typedef)  
** atomic_uint8_t**(C++11)(opcional) |  std::atomic<[std::uint8_t](<#/doc/types/integer>)>   
(typedef)  
** atomic_int16_t**(C++11)(opcional) |  std::atomic<[std::int16_t](<#/doc/types/integer>)>   
(typedef)  
** atomic_uint16_t**(C++11)(opcional) |  std::atomic<[std::uint16_t](<#/doc/types/integer>)>   
(typedef)  
** atomic_int32_t**(C++11)(opcional) |  std::atomic<[std::int32_t](<#/doc/types/integer>)>   
(typedef)  
** atomic_uint32_t**(C++11)(opcional) |  std::atomic<[std::uint32_t](<#/doc/types/integer>)>   
(typedef)  
** atomic_int64_t**(C++11)(opcional) |  std::atomic<[std::int64_t](<#/doc/types/integer>)>   
(typedef)  
** atomic_uint64_t**(C++11)(opcional) |  std::atomic<[std::uint64_t](<#/doc/types/integer>)>   
(typedef)  
** atomic_int_least8_t**(C++11) |  std::atomic<[std::int_least8_t](<#/doc/types/integer>)>   
(typedef)  
** atomic_uint_least8_t**(C++11) |  std::atomic<[std::uint_least8_t](<#/doc/types/integer>)>   
(typedef)  
** atomic_int_least16_t**(C++11) |  std::atomic<[std::int_least16_t](<#/doc/types/integer>)>   
(typedef)  
** atomic_uint_least16_t**(C++11) |  std::atomic<[std::uint_least16_t](<#/doc/types/integer>)>   
(typedef)  
** atomic_int_least32_t**(C++11) |  std::atomic<[std::int_least32_t](<#/doc/types/integer>)>   
(typedef)  
** atomic_uint_least32_t**(C++11) |  std::atomic<[std::uint_least32_t](<#/doc/types/integer>)>   
(typedef)  
** atomic_int_least64_t**(C++11) |  std::atomic<[std::int_least64_t](<#/doc/types/integer>)>   
(typedef)  
** atomic_uint_least64_t**(C++11) |  std::atomic<[std::uint_least64_t](<#/doc/types/integer>)>   
(typedef)  
** atomic_int_fast8_t**(C++11) |  std::atomic<[std::int_fast8_t](<#/doc/types/integer>)>   
(typedef)  
** atomic_uint_fast8_t**(C++11) |  std::atomic<[std::uint_fast8_t](<#/doc/types/integer>)>   
(typedef)  
** atomic_int_fast16_t**(C++11) |  std::atomic<[std::int_fast16_t](<#/doc/types/integer>)>   
(typedef)  
** atomic_uint_fast16_t**(C++11) |  std::atomic<[std::uint_fast16_t](<#/doc/types/integer>)>   
(typedef)  
** atomic_int_fast32_t**(C++11) |  std::atomic<[std::int_fast32_t](<#/doc/types/integer>)>   
(typedef)  
** atomic_uint_fast32_t**(C++11) |  std::atomic<[std::uint_fast32_t](<#/doc/types/integer>)>   
(typedef)  
** atomic_int_fast64_t**(C++11) |  std::atomic<[std::int_fast64_t](<#/doc/types/integer>)>   
(typedef)  
** atomic_uint_fast64_t**(C++11) |  std::atomic<[std::uint_fast64_t](<#/doc/types/integer>)>   
(typedef)  
** atomic_intptr_t**(C++11)(opcional) |  std::atomic<[std::intptr_t](<#/doc/types/integer>)>   
(typedef)  
** atomic_uintptr_t**(C++11)(opcional) |  std::atomic<[std::uintptr_t](<#/doc/types/integer>)>   
(typedef)  
** atomic_size_t**(C++11) |  std::atomic<[std::size_t](<#/doc/types/size_t>)>   
(typedef)  
** atomic_ptrdiff_t**(C++11) |  std::atomic<[std::ptrdiff_t](<#/doc/types/ptrdiff_t>)>   
(typedef)  
** atomic_intmax_t**(C++11) |  std::atomic<[std::intmax_t](<#/doc/types/integer>)>   
(typedef)  
** atomic_uintmax_t**(C++11) |  std::atomic<[std::uintmax_t](<#/doc/types/integer>)>   
(typedef)  
  
##### Aliases para tipos de propósito especial   
  
** atomic_signed_lock_free**(C++20) |  um tipo atômico integral com sinal que é lock-free e para o qual esperar/notificar é mais eficiente   
(typedef)  
** atomic_unsigned_lock_free**(C++20) |  um tipo atômico integral sem sinal que é lock-free e para o qual esperar/notificar é mais eficiente   
(typedef)  
Nota: `std::atomic_int _N_ _t`, `std::atomic_uint _N_ _t`, `std::atomic_intptr_t` e `std::atomic_uintptr_t` são definidos se e somente se `std::int _N_ _t`, `std::uint _N_ _t`, [std::intptr_t](<#/doc/types/integer>) e [std::uintptr_t](<#/doc/types/integer>) forem definidos, respectivamente. `std::atomic_signed_lock_free` e `std::atomic_unsigned_lock_free` são opcionais em implementações freestanding.  | (desde C++20)  
  
### Notas

Existem equivalentes de template de função não membro para todas as funções membro de `std::atomic`. Essas funções não membro podem ser adicionalmente sobrecarregadas para tipos que não são especializações de `std::atomic`, mas são capazes de garantir atomicidade. O único tipo assim na standard library é [std::shared_ptr](<#/doc/memory/shared_ptr>)&lt;U&gt;. 

`_Atomic` é uma [palavra-chave](<#/>) e usada para fornecer [tipos atômicos](<#/>) em C. 

Recomenda-se que as implementações garantam que a representação de `_Atomic(T)` em C seja a mesma que a de `std::atomic<T>` em C++ para cada tipo `T` possível. Os mecanismos usados para garantir atomicidade e ordenação de memória devem ser compatíveis. 

No GCC e Clang, algumas das funcionalidades descritas aqui exigem linkagem com `-latomic`. 

Macro de teste de recurso  | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_atomic_ref`](<#/doc/feature_test>) | [`201806L`](<#/>) | (C++20) | `std::atomic_ref`  
[`__cpp_lib_constexpr_atomic`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr `std::atomic` e std::atomic_ref  
  
### Exemplo

Execute este código
```cpp
    #include <atomic>
    #include <iostream>
    #include <thread>
    #include <vector>
    
    std::atomic_int acnt;
    int cnt;
    
    void f()
    {
        for (auto n{10000}; n; --n)
        {
            ++acnt;
            ++cnt;
            // Note: for this example, relaxed memory order is sufficient,
            // e.g. acnt.fetch_add(1, std::memory_order_relaxed);
        }
    }
    
    int main()
    {
        {
            std::vector<std::jthread> pool;
            for (int n = 0; n < 10; ++n)
                pool.emplace_back(f);
        }
    
        std::cout << "The atomic counter is " << acnt << '\n'
                  << "The non-atomic counter is " << cnt << '\n';
    }
```

Saída possível: 
```
    The atomic counter is 100000
    The non-atomic counter is 69696
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2441](<https://cplusplus.github.io/LWG/issue2441>) | C++11  | typedefs para versões atômicas de tipos inteiros de largura fixa opcionais estavam faltando  | adicionado   
[LWG 3012](<https://cplusplus.github.io/LWG/issue3012>) | C++11  | `std::atomic<T>` era permitido para qualquer `T` que fosse trivially copyable mas não copyable  | tais especializações são proibidas   
[LWG 3949](<https://cplusplus.github.io/LWG/issue3949>) | C++17  | a redação que exigia que std::atomic&lt;bool&gt; tivesse um destrutor trivial foi acidentalmente removida no C++17  | adicionada de volta   
[LWG 4069](<https://cplusplus.github.io/LWG/issue4069>)  
([P3323R1](<https://wg21.link/P3323R1>))  | C++11  | o suporte para `T` cv-qualificado era questionável  | não permitir que `T` seja cv-qualificado   
---|---|---|---
[P0558R1](<https://wg21.link/P0558R1>) | C++11  | a dedução de argumentos de template para algumas funções de tipos atômicos poderia falhar acidentalmente; operações de ponteiro inválidas foram fornecidas  | a especificação foi substancialmente reescrita: typedefs de membro `value_type` e `difference_type` são adicionados   
  
### Veja também

[ atomic_flag](<#/doc/atomic/atomic_flag>)(C++11) |  o tipo atômico booleano lock-free   
(classe)  
[ std::atomic<std::shared_ptr>](<#/doc/memory/shared_ptr/atomic2>)(C++20) |  ponteiro compartilhado atômico   
(especialização de template de classe)  
[ std::atomic<std::weak_ptr>](<#/doc/memory/weak_ptr/atomic2>)(C++20) |  ponteiro fraco atômico   
(especialização de template de classe)  
[Documentação C](<#/>) para tipos atômicos