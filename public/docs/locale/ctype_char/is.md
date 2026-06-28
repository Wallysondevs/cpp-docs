# std::ctype&lt;char&gt;::is

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
bool is( mask m, char c ) const;
const char* is( const char* low, const char* high, mask* vec ) const;
```

1) Verifica se o caractere c é classificado pela mask m de acordo com a tabela de classificação retornada pela função membro table(). Efetivamente calcula table()[(unsigned char)c] & m.

2) Para cada caractere no array de caracteres `[`low`, `high`)`, lê sua mask de classificação completa da tabela de classificação retornada pela função membro table() (isto é, avalia table()[(unsigned char)*p] e a armazena no elemento correspondente do array apontado por vec.

Se (unsigned char)c >= [std::ctype](<#/doc/locale/ctype>)&lt;char&gt;::table_size, então um valor definido pela implementação é substituído em vez de table()[(unsigned char)c], possivelmente diferente para diferentes valores de c.

### Parâmetros

- **c** — caractere a classificar
- **m** — mask a ser usada para classificar um único caractere
- **low** — ponteiro para o primeiro caractere em um array de caracteres a classificar
- **high** — ponteiro um-depois-do-final para o array de caracteres a classificar
- **vec** — ponteiro para o primeiro elemento do array de masks a preencher

### Valor de retorno

1) true se c for classificado por m em table(), false caso contrário.

2) high

### Observações

Ao contrário do template primário [std::ctype](<#/doc/locale/ctype>), esta especialização não realiza uma chamada de função virtual ao classificar caracteres. Para personalizar o comportamento, uma classe derivada pode fornecer uma tabela de classificação não padrão ao construtor da classe base.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 28](<https://cplusplus.github.io/LWG/issue28>) | C++98 | a sobrecarga (2) copiava os valores de vec para table(), o que é o inverso do comportamento pretendido | corrigido

### Veja também

[ do_is](<#/doc/locale/ctype/is>)[virtual] | classifica um caractere ou uma sequência de caracteres
(função membro virtual protegida de `std::ctype<CharT>`)