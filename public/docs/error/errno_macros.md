# Números de erro

Cada uma das macros definidas em [`<cerrno>`](<#/doc/header/cerrno>) se expande para expressões constantes inteiras do tipo int, cada uma com um valor positivo, correspondendo à maioria dos [códigos de erro POSIX](<https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/errno.h.html>). As seguintes constantes são definidas (a implementação pode definir mais, desde que comecem com 'E' seguido por dígitos ou letras maiúsculas).

Definido no header `[<cerrno>](<#/doc/header/cerrno>)`
---
E2BIG(desde C++11) | Lista de argumentos muito longa
(macro constante)
EACCES(desde C++11) | Permissão negada
(macro constante)
EADDRINUSE(desde C++11) | Endereço em uso
(macro constante)
EADDRNOTAVAIL(desde C++11) | Endereço não disponível
(macro constante)
EAFNOSUPPORT(desde C++11) | Família de endereços não suportada
(macro constante)
EAGAIN(desde C++11) | Recurso indisponível, tente novamente
(macro constante)
EALREADY(desde C++11) | Conexão já em andamento
(macro constante)
EBADF(desde C++11) | Descritor de arquivo inválido
(macro constante)
EBADMSG(desde C++11) | Mensagem inválida
(macro constante)
EBUSY(desde C++11) | Dispositivo ou recurso ocupado
(macro constante)
ECANCELED(desde C++11) | Operação cancelada
(macro constante)
ECHILD(desde C++11) | Nenhum processo filho
(macro constante)
ECONNABORTED(desde C++11) | Conexão abortada
(macro constante)
ECONNREFUSED(desde C++11) | Conexão recusada
(macro constante)
ECONNRESET(desde C++11) | Conexão redefinida
(macro constante)
EDEADLK(desde C++11) | Ocorreria um deadlock de recurso
(macro constante)
EDESTADDRREQ(desde C++11) | Endereço de destino necessário
(macro constante)
EDOM | Argumento matemático fora do domínio da função
(macro constante)
EEXIST(desde C++11) | Arquivo existe
(macro constante)
EFAULT(desde C++11) | Endereço inválido
(macro constante)
EFBIG(desde C++11) | Arquivo muito grande
(macro constante)
EHOSTUNREACH(desde C++11) | Host inalcançável
(macro constante)
EIDRM(desde C++11) | Identificador removido
(macro constante)
EILSEQ(desde C++11) | Sequência de bytes ilegal
(macro constante)
EINPROGRESS(desde C++11) | Operação em andamento
(macro constante)
EINTR(desde C++11) | Função interrompida
(macro constante)
EINVAL(desde C++11) | Argumento inválido
(macro constante)
EIO(desde C++11) | Erro de I/O
(macro constante)
EISCONN(desde C++11) | Socket está conectado
(macro constante)
EISDIR(desde C++11) | É um diretório
(macro constante)
ELOOP(desde C++11) | Muitos níveis de links simbólicos
(macro constante)
EMFILE(desde C++11) | Valor do descritor de arquivo muito grande
(macro constante)
EMLINK(desde C++11) | Muitos links
(macro constante)
EMSGSIZE(desde C++11) | Mensagem muito grande
(macro constante)
ENAMETOOLONG(desde C++11) | Nome de arquivo muito longo
(macro constante)
ENETDOWN(desde C++11) | Rede está inativa
(macro constante)
ENETRESET(desde C++11) | Conexão abortada pela rede
(macro constante)
ENETUNREACH(desde C++11) | Rede inalcançável
(macro constante)
ENFILE(desde C++11) | Muitos arquivos abertos no sistema
(macro constante)
ENOBUFS(desde C++11) | Nenhum espaço de buffer disponível
(macro constante)
ENODATA(desde C++11) | Nenhuma mensagem disponível na fila de leitura do cabeçalho STREAM
(macro constante)
ENODEV(desde C++11) | Nenhum dispositivo encontrado
(macro constante)
ENOENT(desde C++11) | Nenhum arquivo ou diretório encontrado
(macro constante)
ENOEXEC(desde C++11) | Erro de formato de arquivo executável
(macro constante)
ENOLCK(desde C++11) | Nenhum lock disponível
(macro constante)
ENOLINK(desde C++11) | Link foi rompido
(macro constante)
ENOMEM(desde C++11) | Espaço insuficiente
(macro constante)
ENOMSG(desde C++11) | Nenhuma mensagem do tipo desejado
(macro constante)
ENOPROTOOPT(desde C++11) | Protocolo não disponível
(macro constante)
ENOSPC(desde C++11) | Nenhum espaço restante no dispositivo
(macro constante)
ENOSR(desde C++11) | Nenhum recurso STREAM
(macro constante)
ENOSTR(desde C++11) | Não é um STREAM
(macro constante)
ENOSYS(desde C++11) | Função não suportada
(macro constante)
ENOTCONN(desde C++11) | O socket não está conectado
(macro constante)
ENOTDIR(desde C++11) | Não é um diretório
(macro constante)
ENOTEMPTY(desde C++11) | Diretório não vazio
(macro constante)
ENOTRECOVERABLE(desde C++11) | Estado não recuperável
(macro constante)
ENOTSOCK(desde C++11) | Não é um socket
(macro constante)
ENOTSUP(desde C++11) | Não suportado
(macro constante)
ENOTTY(desde C++11) | Operação de controle de I/O inapropriada
(macro constante)
ENXIO(desde C++11) | Nenhum dispositivo ou endereço encontrado
(macro constante)
EOPNOTSUPP(desde C++11) | Operação não suportada no socket
(macro constante)
EOVERFLOW(desde C++11) | Valor muito grande para ser armazenado no tipo de dado
(macro constante)
EOWNERDEAD(desde C++11) | Proprietário anterior morreu
(macro constante)
EPERM(desde C++11) | Operação não permitida
(macro constante)
EPIPE(desde C++11) | Pipe quebrado
(macro constante)
EPROTO(desde C++11) | Erro de protocolo
(macro constante)
EPROTONOSUPPORT(desde C++11) | Protocolo não suportado
(macro constante)
EPROTOTYPE(desde C++11) | Tipo de protocolo errado para socket
(macro constante)
ERANGE | Resultado muito grande
(macro constante)
EROFS(desde C++11) | Sistema de arquivos somente leitura
(macro constante)
ESPIPE(desde C++11) | Seek inválido
(macro constante)
ESRCH(desde C++11) | Nenhum processo encontrado
(macro constante)
ETIME(desde C++11) | Timeout de ioctl() de Stream
(macro constante)
ETIMEDOUT(desde C++11) | Conexão expirou
(macro constante)
ETXTBSY(desde C++11) | Arquivo de texto ocupado
(macro constante)
EWOULDBLOCK(desde C++11) | Operação bloquearia
(macro constante)
EXDEV(desde C++11) | Link entre dispositivos
(macro constante)

Todos os valores devem ser únicos, exceto que os valores de `EOPNOTSUPP` e `ENOTSUP` podem ser idênticos e os valores de `EAGAIN` e `EWOULDBLOCK` podem ser idênticos.

### Exemplo

Execute este código
```cpp
    #include <cerrno>
    #include <cstring>
    #include <iomanip>
    #include <iostream>
     
    #define SHOW(x) std::cout << std::setw(15) << #x << ": " << std::strerror(x) << '\n'
     
    int main()
    {
        std::cout << "Known error codes/messages:\n\n";
     
        SHOW( E2BIG );
        SHOW( EACCES );
        SHOW( EADDRINUSE );
        SHOW( EADDRNOTAVAIL );
        SHOW( EAFNOSUPPORT );
        SHOW( EAGAIN );
        SHOW( EALREADY );
        SHOW( EBADF );
        SHOW( EBADMSG );
        SHOW( EBUSY );
        SHOW( ECANCELED );
        SHOW( ECHILD );
        SHOW( ECONNABORTED );
        SHOW( ECONNREFUSED );
        SHOW( ECONNRESET );
        SHOW( EDEADLK );
        SHOW( EDESTADDRREQ );
        SHOW( EDOM );
        SHOW( EEXIST );
        SHOW( EFAULT );
        SHOW( EFBIG );
        SHOW( EHOSTUNREACH );
        SHOW( EIDRM );
        SHOW( EILSEQ );
        SHOW( EINPROGRESS );
        SHOW( EINTR );
        SHOW( EINVAL );
        SHOW( EIO );
        SHOW( EISCONN );
        SHOW( EISDIR );
        SHOW( ELOOP );
        SHOW( EMFILE );
        SHOW( EMLINK );
        SHOW( EMSGSIZE );
        SHOW( ENAMETOOLONG );
        SHOW( ENETDOWN );
        SHOW( ENETRESET );
        SHOW( ENETUNREACH );
        SHOW( ENFILE );
        SHOW( ENOBUFS );
        SHOW( ENODATA );
        SHOW( ENODEV );
        SHOW( ENOENT );
        SHOW( ENOEXEC );
        SHOW( ENOLCK );
        SHOW( ENOLINK );
        SHOW( ENOMEM );
        SHOW( ENOMSG );
        SHOW( ENOPROTOOPT );
        SHOW( ENOSPC );
        SHOW( ENOSR );
        SHOW( ENOSTR );
        SHOW( ENOSYS );
        SHOW( ENOTCONN );
        SHOW( ENOTDIR );
        SHOW( ENOTEMPTY );
        SHOW( ENOTRECOVERABLE );
        SHOW( ENOTSOCK );
        SHOW( ENOTSUP );
        SHOW( ENOTTY );
        SHOW( ENXIO );
        SHOW( EOPNOTSUPP );
        SHOW( EOVERFLOW );
        SHOW( EOWNERDEAD );
        SHOW( EPERM );
        SHOW( EPIPE );
        SHOW( EPROTO );
        SHOW( EPROTONOSUPPORT );
        SHOW( EPROTOTYPE );
        SHOW( ERANGE );
        SHOW( EROFS );
        SHOW( ESPIPE );
        SHOW( ESRCH );
        SHOW( ETIME );
        SHOW( ETIMEDOUT );
        SHOW( ETXTBSY );
        SHOW( EWOULDBLOCK );
        SHOW( EXDEV );
    }
```

Possible output:
```
    Known error codes/messages:
     
              E2BIG: Argument list too long
             EACCES: Permission denied
         EADDRINUSE: Address already in use
      EADDRNOTAVAIL: Cannot assign requested address
       EAFNOSUPPORT: Address family not supported by protocol
             EAGAIN: Resource temporarily unavailable
           EALREADY: Operation already in progress
              EBADF: Bad file descriptor
            EBADMSG: Bad message
              EBUSY: Device or resource busy
          ECANCELED: Operation canceled
             ECHILD: No child processes
       ECONNABORTED: Software caused connection abort
       ECONNREFUSED: Connection refused
         ECONNRESET: Connection reset by peer
            EDEADLK: Resource deadlock avoided
       EDESTADDRREQ: Destination address required
               EDOM: Numerical argument out of domain
             EEXIST: File exists
             EFAULT: Bad address
              EFBIG: File too large
       EHOSTUNREACH: No route to host
              EIDRM: Identifier removed
             EILSEQ: Invalid or incomplete multibyte or wide character
        EINPROGRESS: Operation now in progress
              EINTR: Interrupted system call
             EINVAL: Invalid argument
                EIO: Input/output error
            EISCONN: Transport endpoint is already connected
             EISDIR: Is a directory
              ELOOP: Too many levels of symbolic links
             EMFILE: Too many open files
             EMLINK: Too many links
           EMSGSIZE: Message too long
       ENAMETOOLONG: File name too long
           ENETDOWN: Network is down
          ENETRESET: Network dropped connection on reset
        ENETUNREACH: Network is unreachable
             ENFILE: Too many open files in system
            ENOBUFS: No buffer space available
            ENODATA: No data available
             ENODEV: No such device
             ENOENT: No such file or directory
            ENOEXEC: Exec format error
             ENOLCK: No locks available
            ENOLINK: Link has been severed
             ENOMEM: Cannot allocate memory
             ENOMSG: No message of desired type
        ENOPROTOOPT: Protocol not available
             ENOSPC: No space left on device
              ENOSR: Out of streams resources
             ENOSTR: Device not a stream
             ENOSYS: Function not implemented
           ENOTCONN: Transport endpoint is not connected
            ENOTDIR: Not a directory
          ENOTEMPTY: Directory not empty
    ENOTRECOVERABLE: State not recoverable
           ENOTSOCK: Socket operation on non-socket
            ENOTSUP: Operation not supported
             ENOTTY: Inappropriate ioctl for device
              ENXIO: No such device or address
         EOPNOTSUPP: Operation not supported
          EOVERFLOW: Value too large for defined data type
         EOWNERDEAD: Owner died
              EPERM: Operation not permitted
              EPIPE: Broken pipe
             EPROTO: Protocol error
    EPROTONOSUPPORT: Protocol not supported
         EPROTOTYPE: Protocol wrong type for socket
             ERANGE: Numerical result out of range
              EROFS: Read-only file system
             ESPIPE: Illegal seek
              ESRCH: No such process
              ETIME: Timer expired
          ETIMEDOUT: Connection timed out
            ETXTBSY: Text file busy
        EWOULDBLOCK: Resource temporarily unavailable
              EXDEV: Invalid cross-device link
```

### Veja também

[ errc](<#/doc/error/errc>)(desde C++11) | a enumeração [std::error_condition](<#/doc/error/error_condition>) listando todas as constantes de macro padrão de [`<cerrno>`](<#/doc/header/cerrno>)
(classe)
[ errno](<#/doc/error/errno>) | macro que se expande para uma variável de número de erro thread-local compatível com POSIX
(variável macro)
[ perror](<#/doc/io/c/perror>) | exibe uma string de caracteres correspondente ao erro atual para [stderr](<#/doc/io/c/std_streams>)
(função)
[ strerror](<#/doc/string/byte/strerror>) | retorna uma versão textual de um dado código de erro
(função)
[Documentação C](<#/>) para Números de erro