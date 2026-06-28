# std::experimental::any::any

```cpp
any() noexcept;                               // (1) (library fundamentals TS)
any( const any& other );                      // (2) (library fundamentals TS)
any( any&& other ) noexcept;                  // (3) (library fundamentals TS)
template<typename ValueType>
any( ValueType&& value );                     // (4) (library fundamentals TS)
```
Constrói um novo objeto `any`.

1) Constrói um objeto vazio.

2,3) Copia (2) ou move (3) o conteúdo de `other` para uma nova instância, de modo que qualquer conteúdo seja equivalente em tipo e valor aos de `other` antes da chamada do construtor, ou vazio se `other` estiver vazio.

4) Constrói um objeto com conteúdo inicial sendo um objeto do tipo [std::decay_t](<#/doc/types/decay>)&lt;ValueType&gt;, [direct-initialized](<#/doc/language/direct_initialization>) a partir de [std::forward](<#/doc/utility/forward>)&lt;ValueType&gt;(value). Se [std::is_copy_constructible](<#/doc/types/is_copy_constructible>)<[std::decay_t](<#/doc/types/decay>)&lt;ValueType&gt;>::value for `false`, o programa é malformado. Esta sobrecarga participa da resolução de sobrecarga apenas se [std::decay_t](<#/doc/types/decay>)&lt;ValueType&gt; não for do mesmo tipo que `any`.

### Parâmetros de template

| ValueType | - | tipo de valor contido |
|---|---|---|

**Requisitos de tipo**
- `std::decay_t<ValueType>` deve atender aos requisitos de [CopyConstructible](<#/doc/named_req/CopyConstructible>).

### Parâmetros

| other | - | outro objeto `any` para copiar ou mover |
|---|---|---|
| value | - | valor para inicializar o valor contido |

### Exceções

2,4) Lança qualquer exceção lançada pelo construtor do tipo contido.

### Veja também

```cpp
|  operator= | atribui um objeto `any`
```
|---|---|
| (função membro pública)

---
* [Value]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso fornecido.
* [Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão.