# std::ctype_base

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
class ctype_base;
A classe **std::ctype_base** lista as categorias de classificação de caracteres que são herdadas pelas facets std::ctype.
```

### Tipos de membros

mask |  [BitmaskType](<#/doc/named_req/BitmaskType>) não especificado (enumeração, tipo inteiro ou bitset)
(typedef)

### Constantes de membros

space[static] |  o valor de `mask` que identifica a classificação de caractere de espaço em branco
(constante de membro estática pública)
print[static] |  o valor de `mask` que identifica a classificação de caractere imprimível
(constante de membro estática pública)
cntrl[static] |  o valor de `mask` que identifica a classificação de caractere de controle
(constante de membro estática pública)
upper[static] |  o valor de `mask` que identifica a classificação de caractere maiúsculo
(constante de membro estática pública)
lower[static] |  o valor de `mask` que identifica a classificação de caractere minúsculo
(constante de membro estática pública)
alpha[static] |  o valor de `mask` que identifica a classificação de caractere alfabético
(constante de membro estática pública)
digit[static] |  o valor de `mask` que identifica a classificação de caractere de dígito
(constante de membro estática pública)
punct[static] |  o valor de `mask` que identifica a classificação de caractere de pontuação
(constante de membro estática pública)
xdigit[static] |  o valor de `mask` que identifica a classificação de caractere de dígito hexadecimal
(constante de membro estática pública)
blank[static] (desde C++11) |  o valor de `mask` que identifica a classificação de caractere em branco
(constante de membro estática pública)
alnum[static] |  alpha | digit
(constante de membro estática pública)
graph[static] |  alnum | punct
(constante de membro estática pública)

### Veja também

[ ctype](<#/doc/locale/ctype>) |  define tabelas de classificação de caracteres
(modelo de classe)
[ ctype&lt;char&gt;](<#/doc/locale/ctype_char>) |  especialização de [std::ctype](<#/doc/locale/ctype>) para o tipo char
(especialização de modelo de classe)
[ ctype_byname](<#/doc/locale/ctype_byname>) |  representa o [std::ctype](<#/doc/locale/ctype>) fornecido pelo sistema para a locale nomeada
(modelo de classe)