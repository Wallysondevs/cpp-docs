# std::fegetexceptflag, std::fesetexceptflag

Definido no cabeçalho `[<cfenv>](<#/doc/header/cfenv>)`

```c
int fegetexceptflag( std::fexcept_t* flagp, int excepts );
int fesetexceptflag( const std::fexcept_t* flagp, int excepts );
```

1) Tenta obter o conteúdo completo dos flags de exceção de ponto flutuante que estão listados no argumento bitmask `excepts`, que é um OR bit a bit das [macros de exceção de ponto flutuante](<#/doc/numeric/fenv/FE_exceptions>).

2) Tenta copiar o conteúdo completo dos flags de exceção de ponto flutuante que estão listados em `excepts` de `flagp` para o ambiente de ponto flutuante. Não levanta nenhuma exceção, apenas modifica os flags.

O conteúdo completo de um flag de exceção de ponto flutuante não é necessariamente um valor booleano indicando se a exceção foi levantada ou limpa. Por exemplo, pode ser uma struct que inclui o status booleano e o endereço do código que acionou a exceção. Essas funções obtêm todo esse conteúdo e o obtêm/armazenam em `flagp` em um formato definido pela implementação.

### Parâmetros

- **flagp** — ponteiro para um objeto [std::fexcept_t](<#/doc/numeric/fenv>) onde os flags serão armazenados ou lidos
- **excepts** — bitmask listando os flags de exceção a serem obtidos/definidos

### Valor de retorno

​0​ em caso de sucesso, diferente de zero caso contrário.

### Veja também

[Documentação C](<#/>) para fegetexceptflag, fesetexceptflag
---