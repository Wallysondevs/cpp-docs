# Cabeçalho da biblioteca padrão &lt;cerrno&gt;

Este cabeçalho estava originalmente na biblioteca padrão C como [`<errno.h>`](<#/>).

Este cabeçalho faz parte da biblioteca de [tratamento de erros](<#/doc/error>).

### Macros

[ errno](<#/doc/error/errno>) | macro que se expande para uma variável de número de erro thread-local compatível com POSIX
(variável macro)
E2BIG(desde C++11) | Lista de argumentos muito longa
(constante macro)
EACCES(desde C++11) | Permissão negada
(constante macro)
EADDRINUSE(desde C++11) | Endereço em uso
(constante macro)
EADDRNOTAVAIL(desde C++11) | Endereço não disponível
(constante macro)
EAFNOSUPPORT(desde C++11) | Família de endereços não suportada
(constante macro)
EAGAIN(desde C++11) | Recurso indisponível, tente novamente
(constante macro)
EALREADY(desde C++11) | Conexão já em andamento
(constante macro)
EBADF(desde C++11) | Descritor de arquivo inválido
(constante macro)
EBADMSG(desde C++11) | Mensagem inválida
(constante macro)
EBUSY(desde C++11) | Dispositivo ou recurso ocupado
(constante macro)
ECANCELED(desde C++11) | Operação cancelada
(constante macro)
ECHILD(desde C++11) | Nenhum processo filho
(constante macro)
ECONNABORTED(desde C++11) | Conexão abortada
(constante macro)
ECONNREFUSED(desde C++11) | Conexão recusada
(constante macro)
ECONNRESET(desde C++11) | Conexão redefinida
(constante macro)
EDEADLK(desde C++11) | Ocorreria um deadlock de recurso
(constante macro)
EDESTADDRREQ(desde C++11) | Endereço de destino necessário
(constante macro)
EDOM | Argumento matemático fora do domínio da função
(constante macro)
EEXIST(desde C++11) | Arquivo existe
(constante macro)
EFAULT(desde C++11) | Endereço inválido
(constante macro)
EFBIG(desde C++11) | Arquivo muito grande
(constante macro)
EHOSTUNREACH(desde C++11) | Host inalcançável
(constante macro)
EIDRM(desde C++11) | Identificador removido
(constante macro)
EILSEQ | Sequência de bytes ilegal
(constante macro)
EINPROGRESS(desde C++11) | Operação em andamento
(constante macro)
EINTR(desde C++11) | Função interrompida
(constante macro)
EINVAL(desde C++11) | Argumento inválido
(constante macro)
EIO(desde C++11) | Erro de E/S
(constante macro)
EISCONN(desde C++11) | Socket está conectado
(constante macro)
EISDIR(desde C++11) | É um diretório
(constante macro)
ELOOP(desde C++11) | Muitos níveis de links simbólicos
(constante macro)
EMFILE(desde C++11) | Valor do descritor de arquivo muito grande
(constante macro)
EMLINK(desde C++11) | Muitos links
(constante macro)
EMSGSIZE(desde C++11) | Mensagem muito grande
(constante macro)
ENAMETOOLONG(desde C++11) | Nome de arquivo muito longo
(constante macro)
ENETDOWN(desde C++11) | Rede está inativa
(constante macro)
ENETRESET(desde C++11) | Conexão abortada pela rede
(constante macro)
ENETUNREACH(desde C++11) | Rede inalcançável
(constante macro)
ENFILE(desde C++11) | Muitos arquivos abertos no sistema
(constante macro)
ENOBUFS(desde C++11) | Nenhum espaço de buffer disponível
(constante macro)
ENODATA(desde C++11) (obsoleto desde C++23) | Nenhuma mensagem disponível na fila de leitura do cabeçalho STREAM
(constante macro)
ENODEV(desde C++11) | Nenhum dispositivo
(constante macro)
ENOENT(desde C++11) | Nenhum arquivo ou diretório
(constante macro)
ENOEXEC(desde C++11) | Erro de formato de arquivo executável
(constante macro)
ENOLCK(desde C++11) | Nenhum bloqueio disponível
(constante macro)
ENOLINK(desde C++11) | Link foi rompido
(constante macro)
ENOMEM(desde C++11) | Espaço insuficiente
(constante macro)
ENOMSG(desde C++11) | Nenhuma mensagem do tipo desejado
(constante macro)
ENOPROTOOPT(desde C++11) | Protocolo não disponível
(constante macro)
ENOSPC(desde C++11) | Nenhum espaço restante no dispositivo
(constante macro)
ENOSR(desde C++11) (obsoleto desde C++23) | Nenhum recurso STREAM
(constante macro)
ENOSTR(desde C++11) (obsoleto desde C++23) | Não é um STREAM
(constante macro)
ENOSYS(desde C++11) | Função não suportada
(constante macro)
ENOTCONN(desde C++11) | O socket não está conectado
(constante macro)
ENOTDIR(desde C++11) | Não é um diretório
(constante macro)
ENOTEMPTY(desde C++11) | Diretório não vazio
(constante macro)
ENOTRECOVERABLE(desde C++11) | Estado não recuperável
(constante macro)
ENOTSOCK(desde C++11) | Não é um socket
(constante macro)
ENOTSUP(desde C++11) | Não suportado
(constante macro)
ENOTTY(desde C++11) | Operação de controle de E/S inadequada
(constante macro)
ENXIO(desde C++11) | Nenhum dispositivo ou endereço
(constante macro)
EOPNOTSUPP(desde C++11) | Operação não suportada no socket
(constante macro)
EOVERFLOW(desde C++11) | Valor muito grande para ser armazenado no tipo de dado
(constante macro)
EOWNERDEAD(desde C++11) | Proprietário anterior morreu
(constante macro)
EPERM(desde C++11) | Operação não permitida
(constante macro)
EPIPE(desde C++11) | Pipe quebrado
(constante macro)
EPROTO(desde C++11) | Erro de protocolo
(constante macro)
EPROTONOSUPPORT(desde C++11) | Protocolo não suportado
(constante macro)
EPROTOTYPE(desde C++11) | Protocolo de tipo errado para socket
(constante macro)
ERANGE | Resultado muito grande
(constante macro)
EROFS(desde C++11) | Sistema de arquivos somente leitura
(constante macro)
ESPIPE(desde C++11) | Busca inválida
(constante macro)
ESRCH(desde C++11) | Nenhum processo
(constante macro)
ETIME(desde C++11) (obsoleto desde C++23) | Tempo limite de `ioctl()` do Stream
(constante macro)
ETIMEDOUT(desde C++11) | Conexão expirou
(constante macro)
ETXTBSY(desde C++11) | Arquivo de texto ocupado
(constante macro)
EWOULDBLOCK(desde C++11) | Operação bloquearia
(constante macro)
EXDEV(desde C++11) | Link entre dispositivos
(constante macro)

### Notas

Embora o cabeçalho `<cerrno>` seja baseado no cabeçalho da biblioteca padrão C [`<errno.h>`](<#/>), a maioria das macros definidas por `<cerrno>` foram adotadas pelo C++ do padrão POSIX, em vez da biblioteca padrão C.

### Sinopse
```cpp
#define errno /* see description */
#define E2BIG /* see description */           // freestanding
#define EACCES /* see description */          // freestanding
#define EADDRINUSE /* see description */      // freestanding
#define EADDRNOTAVAIL /* see description */   // freestanding
#define EAFNOSUPPORT /* see description */    // freestanding
#define EAGAIN /* see description */          // freestanding
#define EALREADY /* see description */        // freestanding
#define EBADF /* see description */           // freestanding
#define EBADMSG /* see description */         // freestanding
#define EBUSY /* see description */           // freestanding
#define ECANCELED /* see description */       // freestanding
#define ECHILD /* see description */          // freestanding
#define ECONNABORTED /* see description */    // freestanding
#define ECONNREFUSED /* see description */    // freestanding
#define ECONNRESET /* see description */      // freestanding
#define EDEADLK /* see description */         // freestanding
#define EDESTADDRREQ /* see description */    // freestanding
#define EDOM /* see description */            // freestanding
#define EEXIST /* see description */          // freestanding
#define EFAULT /* see description */          // freestanding
#define EFBIG /* see description */           // freestanding
#define EHOSTUNREACH /* see description */    // freestanding
#define EIDRM /* see description */           // freestanding
#define EILSEQ /* see description */          // freestanding
#define EINPROGRESS /* see description */     // freestanding
#define EINTR /* see description */           // freestanding
#define EINVAL /* see description */          // freestanding
#define EIO /* see description */             // freestanding
#define EISCONN /* see description */         // freestanding
#define EISDIR /* see description */          // freestanding
#define ELOOP /* see description */           // freestanding
#define EMFILE /* see description */          // freestanding
#define EMLINK /* see description */          // freestanding
#define EMSGSIZE /* see description */        // freestanding
#define ENAMETOOLONG /* see description */    // freestanding
#define ENETDOWN /* see description */        // freestanding
#define ENETRESET /* see description */       // freestanding
#define ENETUNREACH /* see description */     // freestanding
#define ENFILE /* see description */          // freestanding
#define ENOBUFS /* see description */         // freestanding
#define ENODEV /* see description */          // freestanding
#define ENOENT /* see description */          // freestanding
#define ENOEXEC /* see description */         // freestanding
#define ENOLCK /* see description */          // freestanding
#define ENOLINK /* see description */         // freestanding
#define ENOMEM /* see description */          // freestanding
#define ENOMSG /* see description */          // freestanding
#define ENOPROTOOPT /* see description */     // freestanding
#define ENOSPC /* see description */          // freestanding
#define ENOSYS /* see description */          // freestanding
#define ENOTCONN /* see description */        // freestanding
#define ENOTDIR /* see description */         // freestanding
#define ENOTEMPTY /* see description */       // freestanding
#define ENOTRECOVERABLE /* see description */ // freestanding
#define ENOTSOCK /* see description */        // freestanding
#define ENOTSUP /* see description */         // freestanding
#define ENOTTY /* see description */          // freestanding
#define ENXIO /* see description */           // freestanding
#define EOPNOTSUPP /* see description */      // freestanding
#define EOVERFLOW /* see description */       // freestanding
#define EOWNERDEAD /* see description */      // freestanding
#define EPERM /* see description */           // freestanding
#define EPIPE /* see description */           // freestanding
#define EPROTO /* see description */          // freestanding
#define EPROTONOSUPPORT /* see description */ // freestanding
#define EPROTOTYPE /* see description */      // freestanding
#define ERANGE /* see description */          // freestanding
#define EROFS /* see description */           // freestanding
#define ESPIPE /* see description */          // freestanding
#define ESRCH /* see description */           // freestanding
#define ETIMEDOUT /* see description */       // freestanding
#define ETXTBSY /* see description */         // freestanding
#define EWOULDBLOCK /* see description */     // freestanding
#define EXDEV /* see description */           // freestanding
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 288](<https://cplusplus.github.io/LWG/issue288>) | C++98 | a macro `EILSEQ` não estava definida em `<cerrno>` | definida

### Ver também

*   [Descrição para os valores dos números de erro](<#/doc/error/errno_macros>)
