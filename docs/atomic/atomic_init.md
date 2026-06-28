# std::atomic_init

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
template< class T >
void atomic_init
( std::atomic<T>* obj,
typename std::atomic<T>::value_type desired ) noexcept;
(obsoleto desde C++20)
template< class T >
void atomic_init
( volatile std::atomic<T>* obj,
typename std::atomic<T>::value_type desired ) noexcept;
(obsoleto desde C++20)
```

Inicializa o objeto atômico `obj` construído por padrão com o valor `desired`. A função não é atômica: acesso concorrente de outra thread, mesmo através de uma operação atômica, é uma condição de corrida de dados (data race).

Se `obj` não foi construído por padrão, ou esta função for chamada duas vezes no mesmo `obj`, o comportamento é indefinido.

### Parâmetros

- **obj** — ponteiro para um objeto atômico a ser inicializado
- **desired** — o valor para inicializar o objeto atômico

### Valor de retorno

(nenhum)

### Notas

Esta função é fornecida para compatibilidade com C. Se a compatibilidade não for necessária, [std::atomic](<#/doc/atomic/atomic>) pode ser inicializado através de seus construtores não-padrão.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[P0558R1](<https://wg21.link/P0558R1>) | C++11 | correspondência exata de tipo era exigida porque
`T` era deduzido de múltiplos argumentos | `T` é deduzido apenas
de `obj`

### Veja também

[ ATOMIC_VAR_INIT](<#/doc/atomic/ATOMIC_VAR_INIT>)(C++11)(obsoleto desde C++20) | inicialização constante de uma variável atômica com duração de armazenamento estática
(macro de função)
[ (construtor)](<#/doc/atomic/atomic/atomic>) | constrói um objeto atômico
(função membro pública de `std::atomic<T>`)
[Documentação C](<#/>) para atomic_init