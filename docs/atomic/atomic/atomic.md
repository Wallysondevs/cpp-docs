# std::atomic&lt;T&gt;::atomic

```cpp
  // (1)
atomic() noexcept = default;  // (desde C++11)
(até C++20)
constexpr atomic() noexcept(std::is_nothrow_default_constructible_v<T>);  // (desde C++20)
constexpr atomic( T desired ) noexcept;  // (2) (desde C++11)
atomic( const atomic& ) = delete;  // (3) (desde C++11)
```

  
Constrói uma nova variável atômica.

1) O construtor padrão é trivial: nenhuma inicialização ocorre além da [inicialização zero](<#/doc/language/zero_initialization>) de objetos estáticos e thread-local. [std::atomic_init](<#/doc/atomic/atomic_init>) pode ser usado para completar a inicialização.  | (até C++20)  
---|---
1) Inicializa por valor o objeto subjacente (ou seja, com T()). A inicialização não é atômica. Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_default_constructible_v](<#/doc/types/is_default_constructible>)&lt;T&gt; for verdadeiro.  | (desde C++20)  
  
2) Inicializa o objeto subjacente com desired. A inicialização não é atômica.

3) Variáveis atômicas não são [CopyConstructible](<#/doc/named_req/CopyConstructible>).

### Parâmetros

desired  |  \-  |  valor para inicializar   
  
### Notas

A [std::atomic](<#/doc/atomic/atomic>)&lt;T&gt; inicializada por padrão não contém um objeto `T`, e seus únicos usos válidos são destruição e inicialização por [std::atomic_init](<#/doc/atomic/atomic_init>), veja [LWG issue 2334](<https://cplusplus.github.io/LWG/issue2334>).  | (até C++20)  
  
### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento como publicado  | Comportamento correto   
---|---|---|---
[LWG 4169](<https://cplusplus.github.io/LWG/issue4169>) | C++20  | [std::is_default_constructible_v](<#/doc/types/is_default_constructible>) poderia reportar falso positivo  | o construtor padrão é restrito 